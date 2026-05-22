---
name: audio-to-markdown
description: Transcribe an audio file (mp3 / wav / m4a) to clean Markdown. Wraps Microsoft's `markitdown` library (via `uvx`); transcription uses the SpeechRecognition library's Google Web Speech API backend (free tier - no API key required for the deterministic step). Two optional summarize sub-modes (host agent does the LLM work, no API key needed) - "single" produces one structured summary MD, "sections" auto-derives 3-8 chapter sections and writes one MD per section + an index (designed to feed downstream chapter infographics). Use when the user provides an audio file or asks to "transcribe this audio", "convert this mp3 to text", "summarize this podcast episode", or "meeting recording to MD".
---

# Audio to Markdown

Two stages, both deterministic from the script's perspective:

1. **Transcribe** — a Bun script invokes `uvx 'markitdown[audio-transcription]==0.1.5' <input>` and captures the resulting transcript Markdown. Output: a transcript file with YAML frontmatter at `<out>/<parent-dir>/<slug>.md`.
2. **Summarize** *(optional)* — *you* (the host agent) do the LLM work in this conversation. Two mutually exclusive sub-modes:
   - **2a. Single summary** — one summary MD via `prompts/summary.md` → `<slug>.summary.md`.
   - **2b. Sections** — auto-derive 3–8 chapter sections via `prompts/outline.md` + `prompts/section.md`, plus a deterministic index → `<slug>/00-index.md` + `<slug>/NN-<section>.md` × N.

## Transcription backend

markitdown's `[audio-transcription]` extra pulls in `pydub` + `SpeechRecognition`. The default `SpeechRecognition` backend is **Google Web Speech API (free tier, no API key)** — which is why this skill stays key-less for the deterministic step.

| Trade-off | Detail |
|---|---|
| Cost | Free, no signup. |
| Rate limits | Practical ceiling ~10 minutes of audio per clip; longer audio is split into chunks automatically. |
| Languages | Defaults to English; pass the language to markitdown if you need others (see README). |
| Accuracy | Reasonable for clean recordings; degrades with noise / overlap / accents. |
| Higher fidelity | Swap in OpenAI Whisper or local Whisper via markitdown's options if you need it — see README. |

## When to use Step 2a vs Step 2b

| User intent | Path |
|---|---|
| "summarize this episode" / "give me a TL;DR of this meeting" / "what did they say?" | Step 2a |
| "break this episode into chapter notes" / "make per-segment infographics from this podcast" | Step 2b |

## Script Directory

**Important**: All scripts are in the `scripts/` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`.
2. Script entry = `${SKILL_DIR}/scripts/main.ts`.
3. Replace all `${SKILL_DIR}` in this document with the actual path.

**Script Reference**:

| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | CLI entry. Subcommands: transcribe (default), `--check`, `--help`. |
| `scripts/markitdown.ts` | Spawns `uvx 'markitdown[audio-transcription]==<version>' <input>` and captures stdout / stderr. |
| `scripts/output.ts` | Slug rule, path resolution, YAML frontmatter assembly, metadata stripping, duration extraction. |

## Step 1 — Transcribe

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts <input> [--out <dir>] [options]
```

| Flag | Effect |
|---|---|
| `--out <dir>` | Output root (default: `./audio-to-markdown`). |
| `--ignore-metadata` | Drop the metadata block (Title / Artist / Album / Duration / ...) at the top of the transcript. |
| `--summarize` | After transcription, reminds you to run Step 2a in-conversation. |
| `--prompt <path>` | Override `prompts/summary.md` (only with `--summarize`). |

Exit code `0` = success (path written to stdout); `1` = tool/argument error (missing file, unsupported extension, `uv` not installed); `2` = transcription error (silent audio, codec issue, rate-limited, etc.).

## Step 2a — Single summary

When the user asks to "summarize this episode", "give me a TL;DR", or similar after Step 1:

1. **Read the prompt template** at `${SKILL_DIR}/prompts/summary.md`.
2. **Read the transcript** produced in Step 1 (skip the YAML frontmatter when feeding the model).
3. **Apply the prompt** in this conversation. Pass through the title / source path / duration from the frontmatter as user-message context. Produce the structured Markdown output described by the prompt template — verbatim, no preamble or trailing commentary.
4. **Write the result** to `<out>/<parent-dir>/<slug>.summary.md`. Use the `Write` tool.

The prompt template is fully user-editable. Whatever structure it specifies is what you produce — the script does not parse the response.

## Step 2b — Per-chapter sections

When the user asks to "break this into chapter notes" or "make per-segment infographics from this podcast" after Step 1, this is a **three-pass workflow you orchestrate yourself**.

### Pass A — Outline

1. Read `${SKILL_DIR}/prompts/outline.md`.
2. Read the transcript produced in Step 1.
3. Apply the outline prompt to the transcript body. The prompt is engineered to make you emit blocks in this exact format:

   ```
   ### <Section Title>
   ANCHOR: <verbatim 5-15-word phrase from the transcript that marks the start of this section>
   BRIEF: <one-sentence description>
   ```

4. **Parse your own response** by extracting one tuple per `###` heading: `title`, `anchor`, `brief`.

5. Validate:
   - 3–8 sections.
   - Each `anchor` appears verbatim somewhere in the transcript body.
   - Each `brief` is non-empty and is one sentence.
   - Sections are in source order.

   If validation fails, write your raw outline response to `<out>/<parent-dir>/<slug>/_outline-raw.md` for the user, explain the failure, and stop.

### Pass B — Per-chapter MDs (parallel-friendly)

For each section, in parallel where reasonable:

1. Read `${SKILL_DIR}/prompts/section.md`.
2. **Locate the section's content** using `ANCHOR` as the start; the section runs to the next section's anchor or end of transcript.
3. Apply the section prompt with this user-message context:

   ```
   Recording: <title>
   Source: <file path>
   Duration: <duration if known>
   Section <N> of <M>: <title>
   Brief: <brief>

   Transcript excerpt:
   <regional content from the transcript>
   ```

4. Write the model's verbatim response to `<out>/<parent-dir>/<slug>/NN-<section-slug>.md`.

### Pass C — Index (deterministic, no LLM)

Write `<out>/<parent-dir>/<slug>/00-index.md` with this exact structure:

```markdown
# <Recording Title>

> **Source:** <file path>
> **Duration:** <duration from frontmatter, if any>
> **Generated:** <YYYY-MM-DD>

---

## Sections

| # | Section | Brief |
|---|---------|-------|
| 01 | [<title>](./01-<slug>.md) | <brief> |
| 02 | [<title>](./02-<slug>.md) | <brief> |
…
```

## Output

```
audio-to-markdown/<parent-dir>/<slug>.md            # Step 1: transcript
audio-to-markdown/<parent-dir>/<slug>.summary.md    # Step 2a: single summary
audio-to-markdown/<parent-dir>/<slug>/00-index.md   # Step 2b: index
audio-to-markdown/<parent-dir>/<slug>/NN-<section-slug>.md  # Step 2b: per-chapter
```

YAML frontmatter on the Step 1 transcript:

```yaml
---
source: <absolute path to input audio>
title: <derived from filename>
format: mp3 | wav | m4a
duration: <H:MM:SS if markitdown reported it>
captured_at: <ISO 8601>
word_count: <N>
---
```

`<slug>` rule: lowercase, alphanumerics joined with `-`, ≤50 chars. Conflict resolution: append `-YYYYMMDD-HHMMSS`.

## Customizing the prompts

All three AI-driving prompts live under `${SKILL_DIR}/prompts/` as plain Markdown. Edit them to change output style, language, depth, or focus. **No code changes required.**

| File | Drives | Constraints |
|---|---|---|
| `prompts/summary.md` | Step 2a | Free-form. |
| `prompts/outline.md` | Step 2b Pass A | **Must keep the `### / ANCHOR: / BRIEF:` markers** — the agent extracts those values. |
| `prompts/section.md` | Step 2b Pass B | Free-form. The most important prompt to tune for downstream **infographic** generation. |

## Diagnostics

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts --check
```

Reports Bun version, Node version, prompt presence, and `uvx` detection.

## Environment Variables

| Variable | Default / fallback | Description |
|---|---|---|
| `AUDIOMD_DATA_DIR` | `./audio-to-markdown` (cwd) | Output root override. |
| `MARKITDOWN_UVX` | auto-detected | `uvx` executable override. |

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Tool / argument error (bad path, unsupported extension, `uv` not installed) |
| `2` | Transcription error (silent audio, codec issue, rate-limited, network unavailable, ...) |
