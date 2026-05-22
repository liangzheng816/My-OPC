# audio-test — example reproduce instructions

Unlike `pdf-test/` and `office-test/`, this folder ships **without pre-rendered example outputs**. The audio path has a runtime prerequisite (`ffmpeg`) and a network-dependent backend (Google Web Speech free tier) that aren't always available in CI / test environments, so we provide reproduce instructions instead.

## Why no pre-rendered outputs?

`markitdown[audio-transcription]` uses `pydub` for audio decoding and `SpeechRecognition` for transcription. `pydub` shells out to `ffmpeg`/`ffprobe` for any non-PCM-WAV input — without those binaries, even loading the audio file fails before transcription starts. We didn't want to ship a transcript that's tied to a specific machine's tool versions / network conditions, so we ship the recipe instead.

## Reproduce — recommended source

The same MIT-licensed audio fixture from Microsoft's `markitdown` repo (~5 seconds, 156 KB MP3):

```bash
# Prerequisites (one-time)
brew install uv       # or: pip install uv
brew install ffmpeg   # apt install ffmpeg / choco install ffmpeg

# Get the fixture
curl -L -o test.mp3 \
  https://github.com/microsoft/markitdown/raw/main/packages/markitdown/tests/test_files/test.mp3

# Step 1 — transcribe
SKILL=~/.claude/skills/audio-to-markdown/scripts/main.ts
npx -y bun "$SKILL" ./test.mp3 --out ./audio-test
```

The first run downloads `markitdown[audio-transcription]==0.1.5` (and its native deps) into the `uvx` cache (~1 minute). Subsequent runs are fast.

Step 2a / 2b are then performed by the host agent in a Claude Code / Codex session — see [SKILL.md](../SKILL.md) for the agent-facing workflow.

## What you should see

Approximate output shape (frontmatter values will vary):

```
audio-test/
└── inbox/
    ├── test.md              # Step 1: transcript with YAML frontmatter (format: mp3, duration: ...)
    ├── test.summary.md      # Step 2a: single-MD summary (host agent)
    └── test/                # Step 2b: per-chapter (host agent)
        ├── 00-index.md
        └── 01-*.md
        ...
```

For very short audio (~5 s) the Step 2b sections pass may not produce 3-8 meaningful sections — sections-mode is most useful on podcast-length recordings (5-30 minutes). For the short markitdown fixture, run only Step 1 + Step 2a.

## Higher-fidelity transcription

The default Google Web Speech backend is free, anonymous, and rate-limited (~10 min audio per request in practice). For higher accuracy or longer clips:

- **OpenAI Whisper (cloud)** — pass `OPENAI_API_KEY` and a model via the markitdown `[audio-transcription]` extras. See [markitdown's audio docs](https://github.com/microsoft/markitdown#audio) for the exact env vars / flags.
- **Local Whisper** — run [`whisper`](https://github.com/openai/whisper) or `whisper.cpp` upstream of this skill (transcribe → write the transcript to a file → drop it into your downstream MD pipeline).

This skill stays key-less by default; higher-fidelity backends are an opt-in escape hatch documented in the main [README.md](../README.md).

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `Error: ... ffprobe ... No such file or directory` | Install `ffmpeg`: `brew install ffmpeg`. |
| `Error: markitdown failed (exit 1)` mentioning `Google Web Speech` | Network failure or free-tier rate limit. Wait, split the clip, or switch to a paid backend. |
| `uvx: NOT FOUND` from `--check` | Install `uv`: `brew install uv` / `pip install uv`. |
| Empty / silent transcript | The audio may be silent at the start, mono with very low level, or codec-incompatible. |
