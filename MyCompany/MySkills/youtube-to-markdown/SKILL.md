---
name: youtube-to-markdown
description: Fetch a YouTube transcript and (optionally) summarize it into Markdown. Two paths - "transcript" runs a deterministic Bun script that produces a timestamped transcript MD; "summarize" is an agent-driven workflow that turns that transcript into either a single structured summary or multiple per-chapter MDs (designed to feed chapter infographics). NO API key required - all LLM work is performed by the host agent in its own conversation. Use when the user pastes a YouTube URL (youtube.com, youtu.be, shorts) or asks to "get the transcript", "summarize this YouTube video", "convert YouTube to markdown", or "break this video into chapters".
---

# YouTube to Markdown

A two-stage skill:

1. **Transcript** — a Bun script fetches the YouTube transcript and writes it as timestamped Markdown. Pure I/O; no LLM, no API key.
2. **Summarize** — *you* (the host agent) read one of the prompt templates in `${SKILL_DIR}/prompts/`, apply it to the transcript content inside this conversation, and write the resulting Markdown to disk. Two sub-modes:
   - **2a. Single summary** — one summary MD distilled from the full transcript.
   - **2b. Per-chapter** — multiple chapter MDs + a `00-index.md`, designed to feed chapter-based infographic generation.

This is identical in spirit to `baoyu-comic` and `baoyu-slide-deck`: the script does the deterministic plumbing, and the agent drives the AI step using user-tunable prompt files.

## Script Directory

**Important**: All scripts are in the `scripts/` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`.
2. Script entry = `${SKILL_DIR}/scripts/main.ts`.
3. Replace all `${SKILL_DIR}` in this document with the actual path.

**Script Reference**:

| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | CLI entry point. Subcommands: `transcript`, `--check`, `--help`. No LLM calls. |
| `scripts/transcript.ts` | URL → timestamped Markdown. Imports `yt-transcript-api`. |

## When to use each path

| User intent | Path |
|---|---|
| "just get the transcript" / "save this YouTube video as text" | Step 1 only |
| "summarize this YouTube video" / "what's it about?" | Step 1 + Step 2a |
| "break this into chapters" / "give me chapter notes" / "make infographics from this video" | Step 1 + Step 2b |

## Step 1 — Fetch the transcript

Run the Bun script. No API key needed.

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts transcript <youtube-url> [--out <dir>]
```

- `--out <dir>` defaults to `./youtube-to-markdown` (relative to the user's CWD).
- Output: `<out>/<slug>.transcript.md`. The script prints that path on stdout when done.
- `<slug>` is derived from the video title (lowercase, alphanumerics joined with `-`, capped at 40 chars).

The transcript MD has this shape:

```
# <Video Title>

> **Channel:** <author>
> **Source:** <url>
> **Converted:** <YYYY-MM-DD>
> **Duration:** ~MM:SS
> **Snippets:** <N>

---

## Transcript

[00:01] first snippet text
[00:05] second snippet text
...
```

Read it with the `Read` tool. Strip the `[MM:SS]` prefixes when feeding the body to the model in step 2 — the timestamps are only needed for the section-mode slicing in step 2b.

If step 1 exits with code `2`, the video has no captions / is region-locked / age-gated. Tell the user; do not retry.

## Step 2a — Single summary (default summarize path)

1. **Read the prompt template** at `${SKILL_DIR}/prompts/summary.md`. The header comment in that file documents the contract; the body is the system-prompt-style instructions you should follow.
2. **Read the transcript MD** produced in step 1. Strip the `[MM:SS]` prefixes from the `## Transcript` body to get the plain text.
3. **Apply the prompt** to that plain text in this conversation. Pass through the transcript's metadata (title, source URL, duration, channel) as the user-message context. Produce the structured Markdown output described by the prompt template — verbatim, no preamble or trailing commentary.
4. **Write the result** to `<out>/<slug>.summary.md` (same directory as the transcript by default; honor any `--out` the user specified). Use the `Write` tool.

The prompt template is fully user-editable (see "Customizing the prompts" below). Whatever structure it specifies is what you produce.

## Step 2b — Per-chapter summary (sections path)

This is a three-pass workflow you orchestrate yourself:

### Pass A — outline

1. Read `${SKILL_DIR}/prompts/outline.md`.
2. Read the transcript MD (produced in step 1) and strip the `[MM:SS]` prefixes for the model's input. **Keep the original timestamped body separately** — Pass B needs it.
3. Apply the outline prompt to the plain text. The prompt is engineered to make you emit blocks in this exact format:

   ```
   ### <Section Title>
   TIMESTAMPS: <start_seconds>-<end_seconds>
   BRIEF: <one-sentence description>
   ```

4. **Parse your own response** by extracting one tuple per `###` heading:
   - `title` — the text after `### `.
   - `startSec`, `endSec` — the two integers after `TIMESTAMPS:`.
   - `brief` — the text after `BRIEF:`.

5. Validate:
   - 3–8 sections.
   - Sections in chronological order, no overlap (`section[i].startSec >= section[i-1].endSec`).
   - First section starts at `0`. Last section's `endSec` is at or near the video's total duration (you can read the duration from the transcript MD's `> **Duration:**` line).

   If validation fails, dump your raw outline response to `<out>/<slug>/_outline-raw.md` for the user, explain the failure, and stop. Do **not** silently retry — the user has likely tuned `outline.md` in a way that broke the markers, and they need to see the raw output.

### Pass B — per-chapter MDs (parallel-friendly)

Compute filenames first: for the `i`-th section (1-indexed), filename = `NN-<section-slug>.md` where `NN` is zero-padded (`01`, `02`, ...) and `<section-slug>` follows the same rule as the video slug (lowercase, alphanumerics joined with `-`, ≤40 chars).

For each section, in parallel where reasonable:

1. Read `${SKILL_DIR}/prompts/section.md`.
2. **Slice the transcript** by `[MM:SS]` timestamp:
   - Convert each line's `[MM:SS]` back to seconds: `mm * 60 + ss`.
   - Keep lines whose start is in `[startSec, endSec)`.
   - For the **last** section, keep every remaining line at-or-after `startSec` (covers any minor drift between the model-emitted `endSec` and the actual video end).
3. Apply the section prompt with this user-message context:
   ```
   Video: <title>
   Source: <url>
   Section <N> of <M>: <title>
   Timestamps: MM:SS-MM:SS
   Brief: <brief>

   Transcript excerpt:
   <sliced timestamped lines>
   ```
4. Write the model's verbatim response to `<out>/<slug>/NN-<section-slug>.md`.

### Pass C — index (deterministic, no LLM)

Write `<out>/<slug>/00-index.md` with this exact structure:

```markdown
# <Video Title>

> **Channel:** <author>
> **Source:** <url>
> **Duration:** <MM:SS from transcript header>
> **Generated:** <YYYY-MM-DD>

---

## Sections

| # | Section | Range | Brief |
|---|---------|-------|-------|
| 01 | [<title>](./01-<slug>.md) | <MM:SS>-<MM:SS> | <brief> |
| 02 | [<title>](./02-<slug>.md) | <MM:SS>-<MM:SS> | <brief> |
...
```

This is templated string-assembly — no model call needed.

## Output paths summary

| Path | Output |
|---|---|
| Step 1 | `<out>/<slug>.transcript.md` |
| Step 2a | `<out>/<slug>.summary.md` |
| Step 2b | `<out>/<slug>/00-index.md` + `<out>/<slug>/NN-<section-slug>.md` × N |

`<slug>` derives from the video title via the `makeSlug` rule documented above. The script writes step 1's output and prints the path; you handle step 2 paths yourself.

## Customizing the prompts

All three AI-driving prompts live under `${SKILL_DIR}/prompts/` as plain Markdown. Edit them to change output style, language, depth, or focus. **No code changes required.**

| File | Drives | Constraints |
|---|---|---|
| `prompts/summary.md` | Step 2a | Free-form. Whatever structure the prompt specifies, the agent produces. |
| `prompts/outline.md` | Step 2b Pass A | **Must keep the `### / TIMESTAMPS: / BRIEF:` markers** — the agent extracts those values from its own response. Everything else (counts, language, tone) is editable. |
| `prompts/section.md` | Step 2b Pass B | Free-form. This is the most important prompt to tune for downstream **infographic** generation, since each chapter MD is the input to that step. |

Common tweaks (no code change):

- **Output language** — prepend "Output in {language}" near the top.
- **Format** — rewrite the structure block (summary.md and section.md only; outline.md must keep markers).
- **Depth** — adjust per-section bullet/paragraph counts.

## Diagnostics

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts --check
```

Reports Bun version, Node version, prompt-file presence, and confirms LLM is host-handled.

## Exit codes (script)

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Tool / argument error (bad URL, missing flag value, etc.) |
| 2 | Video-side error (no captions, region-locked, age-gated, removed) |

## Environment

The script reads **no** environment variables. The host agent provides the LLM. If the user installs this skill in Claude Code or Codex, no API key setup is required.
