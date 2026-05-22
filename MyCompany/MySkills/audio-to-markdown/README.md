# audio-to-markdown

A Claude Code / Codex skill that transcribes audio files (`.mp3` / `.wav` / `.m4a`) to clean Markdown.

Wraps Microsoft's [`markitdown`](https://github.com/microsoft/markitdown) library via [`uvx`](https://docs.astral.sh/uv/). Transcription uses `SpeechRecognition`'s **Google Web Speech API** backend — free tier, no API key required for the deterministic step.

**No API key required** for transcription or for the optional summarize step. Two summarize sub-modes:

| Step | Who runs it | Output |
|---|---|---|
| 1. Transcribe | Bun script (`main.ts`) | `<out>/<parent-dir>/<slug>.md` (with YAML frontmatter) |
| 2a. Single summary *(optional)* | Host agent, using `prompts/summary.md` | `<out>/<parent-dir>/<slug>.summary.md` |
| 2b. Per-chapter sections *(optional)* | Host agent, using `prompts/outline.md` + `prompts/section.md` | `<out>/<parent-dir>/<slug>/00-index.md` + `NN-<section>.md` × N |

## Supported formats

`.mp3`, `.wav`, `.m4a`. Other formats (e.g., `.flac`, `.ogg`) may work but aren't part of the supported set — convert to one of the three first via `ffmpeg`.

## Install

### Method A — git clone

```bash
git clone https://github.com/liangzheng816/StandaloneSkills.git
ln -s "$(pwd)/StandaloneSkills/audio-to-markdown" ~/.claude/skills/audio-to-markdown
```

### Method B — zip drop-in

```bash
unzip audio-to-markdown.zip -d ~/.claude/skills/
```

## Prerequisites

- **Bun** — fetched on demand via `npx -y bun`. No global install required.
- **`uv`** — one-time install: `pip install uv` or `brew install uv`. The skill calls `uvx 'markitdown[audio-transcription]==0.1.5'`, which `uvx` resolves and caches on first run.
- **Network connection** — the default Google Web Speech backend hits Google's free endpoint.
- **`ffmpeg`** (optional but recommended) — `pydub` uses it for format conversion when the audio isn't already PCM WAV. Install via `brew install ffmpeg` / `apt install ffmpeg`.

## Quick test

```bash
npx -y bun ~/.claude/skills/audio-to-markdown/scripts/main.ts --check
```

## Usage

```bash
SKILL=~/.claude/skills/audio-to-markdown/scripts/main.ts

# Transcribe a podcast episode
npx -y bun "$SKILL" ~/Downloads/episode.mp3

# Suppress the metadata block at the top of the output
npx -y bun "$SKILL" ~/Downloads/episode.mp3 --ignore-metadata

# Custom output directory
npx -y bun "$SKILL" ~/Downloads/meeting.m4a --out /tmp/transcripts
```

### Inside Claude Code or Codex

Drop an audio path with intent ("transcribe this episode", "summarize this podcast", "break this meeting into agenda items"). The host agent runs the script and applies `prompts/*.md` in-conversation for the summarize step. See [`SKILL.md`](./SKILL.md) for the full agent-facing workflow.

## Tuning the prompts

Three plain-Markdown prompts under `prompts/` drive the AI steps. Edit freely — no code changes required.

| File | Drives | Constraint |
|---|---|---|
| `prompts/summary.md` | Step 2a (single summary) | Free-form. |
| `prompts/outline.md` | Step 2b Pass A (auto-derive sections) | **Must keep the `### / ANCHOR: / BRIEF:` markers**. |
| `prompts/section.md` | Step 2b Pass B (per-chapter MDs) | Free-form. **Most important prompt to tune for downstream chapter-infographic generation**. |

## Build / package for distribution

```bash
cd ~/.claude/skills/audio-to-markdown
./package.sh                # -> dist/audio-to-markdown.zip
./package.sh v1.0.0         # -> dist/audio-to-markdown-v1.0.0.zip
```

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Tool / argument error (bad path, unsupported extension, `uv` not installed) |
| 2 | Transcription error (silent audio, codec issue, rate-limited, network unavailable, ...) |

## Environment variables

| Variable | Description |
|---|---|
| `AUDIOMD_DATA_DIR` | Override default output root. |
| `MARKITDOWN_UVX` | Override the `uvx` binary path. |

## Higher-fidelity transcription (optional)

The default Google Web Speech backend is free and fast, but accuracy degrades with noise / overlap / long clips. For higher fidelity:

- **OpenAI Whisper (cloud)** — markitdown supports passing OpenAI credentials and a model. Refer to [markitdown's audio documentation](https://github.com/microsoft/markitdown#audio) for the exact flags / env vars. This requires an API key (not provided by this skill).
- **Local Whisper** — install [`whisper`](https://github.com/openai/whisper) or `whisper.cpp` and pipe its output through this skill manually (post-process the WAV → text yourself, then drop the result into the same output layout).

This skill stays key-less by default; higher-fidelity backends are an opt-in escape hatch.

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `uvx: NOT FOUND` in `--check` | Install `uv`: `pip install uv` or `brew install uv`. |
| First run is slow (~1 min) | `uvx` is downloading and caching `markitdown[audio-transcription]==0.1.5` and its native deps. |
| Empty / silent transcript | The audio may be silent at the start, codec-incompatible, or your network failed mid-transcription. Try a different clip or check connectivity. |
| Exit code `2` with rate-limit text | Google's free tier was hit. Wait, split the clip, or switch to a paid backend. |
| ASR errors (wrong words, missing names) | Inherent limitation of free transcription. Use OpenAI Whisper or local Whisper for accuracy. |
| `ffmpeg` errors | Install `ffmpeg` (`brew install ffmpeg`) so `pydub` can convert non-WAV formats. |
