# MySkills

Standalone Claude Code skills. Five "convert anything to clean Markdown" tools from <https://github.com/liangzheng816/StandaloneSkills>, plus one first-party generator (`self-learning-html`) that consumes the output of those converters.

## Install state

- **Upstream converters (5)** — cloned to `~/.claude/skills/StandaloneSkills/`. Each skill folder is exposed at `~/.claude/skills/<skill>/` via a Windows directory junction (`mklink /J`), so Claude Code discovers `SKILL.md` and the sibling `scripts/`, `prompts/` directories without copying files. Updates: `git pull` in `~/.claude/skills/StandaloneSkills/` updates all 5 in-place.
- **First-party (1) — `self-learning-html`** — lives in this repo at [`self-learning-html/`](self-learning-html/) and is junctioned directly to `~/.claude/skills/self-learning-html`. Edits here are live globally with no copy step. Updates happen by editing this repo, not by `git pull`-ing StandaloneSkills.
- **Project copy of upstream**: this folder also holds a non-junction snapshot of the upstream 5 for in-project browsing — one subdirectory per skill plus [`UPSTREAM_README.md`](UPSTREAM_README.md).

## The 6 skills

| Skill | What it does | Engine |
| --- | --- | --- |
| [/url-to-markdown](url-to-markdown/SKILL.md) | Any URL → clean MD | Plain fetch, auto-escalates to headless Chrome (CDP) for SPA / login-walled / anti-bot pages. Mozilla Readability + Turndown (GFM). |
| [/pdf-to-markdown](pdf-to-markdown/SKILL.md) | PDF → MD | Microsoft `markitdown` via `uvx` (pdfminer.six backend). |
| [/office-to-markdown](office-to-markdown/SKILL.md) | `.docx` / `.pptx` / `.xlsx` / `.csv` → MD | Microsoft `markitdown` via `uvx`. |
| [/audio-to-markdown](audio-to-markdown/SKILL.md) | `.mp3` / `.wav` / `.m4a` → transcript MD | `markitdown[audio-transcription]` with SpeechRecognition (Google Web Speech free tier). `ffmpeg` needed for non-PCM-WAV inputs. |
| [/youtube-to-markdown](youtube-to-markdown/SKILL.md) | YouTube URL → timestamped transcript MD | Bun script, no API key. |
| [/self-learning-html](self-learning-html/SKILL.md) | Any source → interactive HTML learning site (guides + quizzes + flashcards) | Pure agent work driven by `references/{content-schema,page-schemas,design-system,code-patterns}.md`. No script. Delegates extraction to the 5 converters above when input isn't already markdown. |

## Two patterns in this folder

**Converters (the 5 markitdown-style skills):**

1. **Deterministic extraction** (the script does this — no LLM): pulls clean MD from the source.
2. **Optional summarize sub-modes** (the host agent does this — no API key needed):
   - `single` — one structured summary MD
   - `sections` — auto-derives 3-8 chapters, writes one MD per section + index (designed to feed downstream chapter infographics)

**Generator (`self-learning-html`):**

1. **Input routing** (Phase 0): if the source isn't markdown, the agent invokes the matching converter from the row above. If it's markdown already, skip straight to Phase 1.
2. **Generation**: pure agent work reading the four reference files, producing `index.html` + 2-4 guide pages + `quiz-index.html` + `flashcards-index.html`.

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
turn https://en.wikipedia.org/wiki/Spaced_repetition into a self-learning page
build me a quiz + flashcards from ./papers/transformers.pdf
make this YouTube lecture quizzable: https://youtu.be/abc123
```

## Updating

```bash
# upstream converters (5)
cd ~/.claude/skills/StandaloneSkills && git pull

# self-learning-html
# edit MyCompany/MySkills/self-learning-html/ directly — the junction makes edits live globally
```

The upstream converters' project copy under `MyCompany/MySkills/` is a frozen snapshot — re-copy from `~/.claude/skills/StandaloneSkills/` if you want it refreshed. `self-learning-html` has no snapshot vs. live distinction; the in-repo folder IS the live skill.

## Note on naming

There's a separate `youtube-transcript` skill (different source) and `baoyu-url-to-markdown` (Chrome CDP + Defuddle pipeline) already installed globally. They overlap with the YouTube and URL tools above but use different engines — see each `SKILL.md` for tradeoffs.
