# youtube-to-markdown

A Claude Code / Codex skill that fetches YouTube transcripts and lets the host agent summarize them into structured Markdown — either a single summary file or multiple per-chapter files designed to feed downstream infographic generation.

**No API key required.** The script only fetches transcripts; the agent (Claude Code, Codex, etc.) does the summarization in its own conversation context using the prompt files under `prompts/`.

| Step | Who runs it | Output |
|---|---|---|
| 1. Transcript | Bun script (`main.ts transcript`) | `<slug>.transcript.md` (raw, timestamped) |
| 2a. Single summary | Host agent, using `prompts/summary.md` | `<slug>.summary.md` |
| 2b. Per-chapter | Host agent, using `prompts/outline.md` + `prompts/section.md` | `<slug>/00-index.md` + `NN-<section>.md` × N |

All three prompts are user-editable plain Markdown. No code changes required to retune output.

See [`youtube-test/`](./youtube-test) for end-to-end example outputs (transcript + single summary + 8 per-chapter MDs + a downstream infographic) generated against an ~85-minute Lenny's Podcast episode.

## Install

### Method A — git clone (preferred for users who want updates)

```bash
git clone <repo-url> ~/.claude/skills/youtube-to-markdown
```

### Method B — zip drop-in (preferred when sharing the archive)

```bash
unzip youtube-to-markdown.zip -d ~/.claude/skills/
# -> creates ~/.claude/skills/youtube-to-markdown/
```

Either way, the skill is now discoverable by Claude Code / Codex.

## Prerequisites

- **Bun** — fetched on demand via `npx -y bun`. No global install required. The script auto-installs `yt-transcript-api@1.0.8` on first run.
- That's it. No `ANTHROPIC_API_KEY`, no other secrets, no other deps.

## Quick test

```bash
npx -y bun ~/.claude/skills/youtube-to-markdown/scripts/main.ts --check
```

Reports Bun version, Node version, and prompt-file presence. Exits `0` on success.

## Usage

### Inside Claude Code or Codex (the intended path)

Paste a YouTube URL and ask for what you want — "summarize this", "break this into chapter notes", "give me the transcript". The host agent will:

1. Run the transcript script.
2. Read the transcript MD it produced.
3. Read the relevant prompt(s) under `${SKILL_DIR}/prompts/`.
4. Apply them in-conversation and write the resulting Markdown next to the transcript.

The detailed step-by-step orchestration the agent follows lives in [`SKILL.md`](./SKILL.md).

### From the shell (transcript only)

```bash
SKILL=~/.claude/skills/youtube-to-markdown/scripts/main.ts

# URL -> raw timestamped transcript
npx -y bun "$SKILL" transcript "https://www.youtube.com/watch?v=ID" --out /tmp/yt
# -> /tmp/yt/<slug>.transcript.md
```

The shell can only do step 1. Steps 2a/2b need an agent because the script never calls an LLM.

## Tuning the prompts

Edit any of:

```
~/.claude/skills/youtube-to-markdown/prompts/summary.md   # single-summary mode
~/.claude/skills/youtube-to-markdown/prompts/outline.md   # sections mode, Pass A (structural constraints — see header)
~/.claude/skills/youtube-to-markdown/prompts/section.md   # sections mode, Pass B (most important for infographic input)
```

Common tweaks (no code change required):

- **Output language** — prepend "Output in {language}" near the top of the prompt.
- **Format** — rewrite the structure block (summary.md and section.md only; outline.md must keep its `### / TIMESTAMPS: / BRIEF:` markers).
- **Depth** — adjust the per-section bullet/paragraph count.

## Build / package for distribution

From inside the skill directory:

```bash
cd ~/.claude/skills/youtube-to-markdown
./package.sh                # -> dist/youtube-to-markdown.zip
./package.sh v1.0.0         # -> dist/youtube-to-markdown-v1.0.0.zip
```

Hand the zip to a colleague; they `unzip youtube-to-markdown.zip -d ~/.claude/skills/`.

## Exit codes (script)

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Tool / argument error (bad URL, missing flag value) |
| 2 | Video-side error (no captions, region-locked, age-gated) |

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `No captions are available` | The video has no transcript track. Try a different video. |
| Outline section markers not parsing | `prompts/outline.md` was edited in a way that changed the `### / TIMESTAMPS: / BRIEF:` markers. The agent will dump its raw outline response to `_outline-raw.md` for inspection. |
| `npx -y bun` is slow on first run | Bun is being fetched and cached. Subsequent runs are fast. |
| npm install fails behind a corporate proxy | Set `npm_config_registry` (or HTTP proxy env vars) before running. |
| Bun on Windows | Use WSL — the shebang and POSIX paths assume Unix shell. |
