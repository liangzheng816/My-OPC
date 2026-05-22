# MySkills

Standalone Claude Code skills from <https://github.com/liangzheng816/StandaloneSkills>. Five "convert anything to clean Markdown" tools.

## Install state

- **Global** (effective in every project): cloned to `~/.claude/skills/StandaloneSkills/`. Each of the 5 skill folders is exposed at `~/.claude/skills/<skill>/` via a Windows directory junction (`mklink /J`), so Claude Code discovers `SKILL.md` and the sibling `scripts/`, `prompts/` directories without copying files. Updates: `git pull` in `~/.claude/skills/StandaloneSkills/` updates all 5 in-place.
- **Project copy**: this folder holds a non-junction snapshot of the same content for in-project browsing — one subdirectory per skill plus [`UPSTREAM_README.md`](UPSTREAM_README.md).

## The 5 skills

| Skill | What it converts | Engine |
| --- | --- | --- |
| [/url-to-markdown](url-to-markdown/SKILL.md) | Any URL → clean MD | Plain fetch, auto-escalates to headless Chrome (CDP) for SPA / login-walled / anti-bot pages. Mozilla Readability + Turndown (GFM). |
| [/pdf-to-markdown](pdf-to-markdown/SKILL.md) | PDF → MD | Microsoft `markitdown` via `uvx` (pdfminer.six backend). |
| [/office-to-markdown](office-to-markdown/SKILL.md) | `.docx` / `.pptx` / `.xlsx` / `.csv` → MD | Microsoft `markitdown` via `uvx`. |
| [/audio-to-markdown](audio-to-markdown/SKILL.md) | `.mp3` / `.wav` / `.m4a` → transcript MD | `markitdown[audio-transcription]` with SpeechRecognition (Google Web Speech free tier). `ffmpeg` needed for non-PCM-WAV inputs. |
| [/youtube-to-markdown](youtube-to-markdown/SKILL.md) | YouTube URL → timestamped transcript MD | Bun script, no API key. |

## The two-step pattern

Each skill follows the same shape:

1. **Deterministic extraction** (the script does this — no LLM): pulls clean MD from the source.
2. **Optional summarize sub-modes** (the host agent does this — no API key needed):
   - `single` — one structured summary MD
   - `sections` — auto-derives 3-8 chapters, writes one MD per section + index (designed to feed downstream chapter infographics)

## Runtime requirements

- `bun` — required by all five (the SKILL.md uses `npx -y bun` as fallback if not installed globally; you already have `bun 1.3.7`).
- `uv` / `uvx` — needed for `pdf-to-markdown`, `office-to-markdown`, `audio-to-markdown` (auto-installs `markitdown` on first use). Install once: `pip install uv` or <https://docs.astral.sh/uv/getting-started/installation/>.
- `ffmpeg` — only needed for `audio-to-markdown` when input isn't PCM-WAV (most mp3/m4a workflows). <https://ffmpeg.org/download.html>.
- No API keys for anything.

## Sample prompts

```text
save https://www.anthropic.com/news/some-post as markdown
url to markdown https://blog.cloudflare.com/post — give me per-section notes
convert ./report.pdf to markdown and summarize it
pdf to markdown ./paper.pdf — break into chapter notes
office to markdown ./Q3-deck.pptx
transcribe ./meeting.mp3 to markdown, single summary
youtube to markdown https://youtu.be/abc123 — split into chapters
```

## Updating

```bash
cd ~/.claude/skills/StandaloneSkills && git pull
```

All 5 junctioned skills update in-place. The project copy under `MyCompany/MySkills/` is a frozen snapshot — re-copy from `~/.claude/skills/StandaloneSkills/` if you want it refreshed.

## Note on naming

There's a separate `youtube-transcript` skill (different source) and `baoyu-url-to-markdown` (Chrome CDP + Defuddle pipeline) already installed globally. They overlap with the YouTube and URL tools above but use different engines — see each `SKILL.md` for tradeoffs.
