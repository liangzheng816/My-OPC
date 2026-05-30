# MySkills

Standalone Claude Code skills. Five "convert anything to clean Markdown" tools from <https://github.com/liangzheng816/StandaloneSkills>, plus two first-party generators (`self-learning-html` and `create-infographics`) that consume markdown and produce richer output.

## Install state

- **Upstream converters (5)** — cloned to `~/.claude/skills/StandaloneSkills/`. Each skill folder is exposed at `~/.claude/skills/<skill>/` via a Windows directory junction (`mklink /J`), so Claude Code discovers `SKILL.md` and the sibling `scripts/`, `prompts/` directories without copying files. Updates: `git pull` in `~/.claude/skills/StandaloneSkills/` updates all 5 in-place.
- **First-party (2)** — `self-learning-html` and `create-infographics` live in this repo at [`self-learning-html/`](self-learning-html/) and [`create-infographics/`](create-infographics/), each junctioned directly to `~/.claude/skills/<name>`. Edits here are live globally with no copy step. Updates happen by editing this repo, not by `git pull`.
- **Project copy of upstream**: this folder also holds a non-junction snapshot of the upstream 5 for in-project browsing — one subdirectory per skill plus [`UPSTREAM_README.md`](UPSTREAM_README.md).

## The 7 skills

| Skill | What it does | Engine |
| --- | --- | --- |
| [/url-to-markdown](url-to-markdown/SKILL.md) | Any URL → clean MD | Plain fetch, auto-escalates to headless Chrome (CDP) for SPA / login-walled / anti-bot pages. Mozilla Readability + Turndown (GFM). |
| [/pdf-to-markdown](pdf-to-markdown/SKILL.md) | PDF → MD | Microsoft `markitdown` via `uvx` (pdfminer.six backend). |
| [/office-to-markdown](office-to-markdown/SKILL.md) | `.docx` / `.pptx` / `.xlsx` / `.csv` → MD | Microsoft `markitdown` via `uvx`. |
| [/audio-to-markdown](audio-to-markdown/SKILL.md) | `.mp3` / `.wav` / `.m4a` → transcript MD | `markitdown[audio-transcription]` with SpeechRecognition (Google Web Speech free tier). `ffmpeg` needed for non-PCM-WAV inputs. |
| [/youtube-to-markdown](youtube-to-markdown/SKILL.md) | YouTube URL → timestamped transcript MD | Bun script, no API key. |
| [/self-learning-html](self-learning-html/SKILL.md) | Any markdown → interactive HTML learning site (guides + optional quiz + optional flashcards) | Pure agent work driven by `references/{content-schema,page-schemas,design-system,code-patterns}.md`. No script. |
| [/create-infographics](create-infographics/SKILL.md) | Any markdown → publication-quality infographic image (16:9 / 9:16 / 3:4) | Agent picks a layout (21 options) and applies the executive-saas style by default, then calls the bundled `baoyu-image-gen` (Google Gemini default) to render the PNG. |

## Three patterns in this folder

**Converters (the 5 markitdown-style skills):**

1. **Deterministic extraction** (the script does this — no LLM): pulls clean MD from the source.
2. **Optional summarize sub-modes** (the host agent does this — no API key needed):
   - `single` — one structured summary MD
   - `sections` — auto-derives 3-8 chapters, writes one MD per section + index (designed to feed downstream chapter infographics — exactly what `/create-infographics` consumes)

**HTML generator (`self-learning-html`):**

1. Pure agent work reading four reference files; produces `index.html` + 2-4 guide pages + optional `quiz-index.html` + `flashcards-index.html`.
2. Defaults: reading guides always on, flashcards on, quiz off. Confirms with the user once before generating.

**Image generator (`create-infographics`):**

1. Agent reads the markdown, picks a layout from `references/layouts.md` (21 options: bento-grid, binary-comparison, dense-modules, funnel, hub-spoke, etc.) based on content shape.
2. Builds the prompt from `references/prompt-template.md` with anti-duplication safeguards from `references/anti-duplication.md`.
3. Calls the bundled `deps/baoyu-image-gen/scripts/main.ts` via batch file. Output: PNG alongside the source markdown.
4. Default style is **executive-saas** (modern SaaS keynote — white background, blue + orange accents). Other styles are bundled in `deps/baoyu-infographic/`.

## Runtime requirements

- `bun` — required by all converter skills and by `create-infographics` (the SKILL.md uses `npx -y bun` as fallback if not installed globally; you already have `bun 1.3.7`).
- `uv` / `uvx` — needed for `pdf-to-markdown`, `office-to-markdown`, `audio-to-markdown` (auto-installs `markitdown` on first use). Install once: `pip install uv` or <https://docs.astral.sh/uv/getting-started/installation/>.
- `ffmpeg` — only needed for `audio-to-markdown` when input isn't PCM-WAV (most mp3/m4a workflows). <https://ffmpeg.org/download.html>.
- **Image-gen API key** — only `create-infographics` needs one. Defaults to `GOOGLE_API_KEY` (Gemini); also supports OpenAI, OpenRouter, DashScope, Replicate, Jimeng, Seedream. See [`create-infographics/INSTALL.md`](create-infographics/INSTALL.md).
- Converters and `self-learning-html` need no API keys.

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
create an infographic for ./WorkInput/ivan-zhao/00-overall-summary.md
make a 9:16 poster summarizing ./report.md
visualize this content as a 4-stage maturity arc
```

## Updating

```bash
# upstream converters (5)
cd ~/.claude/skills/StandaloneSkills && git pull

# first-party (self-learning-html, create-infographics)
# edit MyCompany/MySkills/<skill>/ directly — the junctions make edits live globally
```

The upstream converters' project copy under `MyCompany/MySkills/` is a frozen snapshot — re-copy from `~/.claude/skills/StandaloneSkills/` if you want it refreshed. The two first-party skills have no snapshot vs. live distinction; the in-repo folders ARE the live skills.

## Note on naming

There's a separate `youtube-transcript` skill (different source) and `baoyu-url-to-markdown` (Chrome CDP + Defuddle pipeline) already installed globally. They overlap with the YouTube and URL tools above but use different engines — see each `SKILL.md` for tradeoffs.
