# StandaloneSkills

A collection of standalone, drop-in [Claude Code](https://claude.com/claude-code) / Codex skills.

Each subdirectory is a self-contained skill that can be installed by:

```bash
# Method A — git clone
git clone https://github.com/liangzheng816/StandaloneSkills.git
ln -s "$(pwd)/StandaloneSkills/<skill-name>" ~/.claude/skills/<skill-name>

# Method B — zip drop-in (when shared as an archive built by the skill's package.sh)
unzip <skill-name>.zip -d ~/.claude/skills/
```

## Skills

| Skill | What it does |
|---|---|
| [youtube-to-markdown](./youtube-to-markdown) | Fetch a YouTube transcript as timestamped Markdown, then let the host agent summarize it (single-MD or per-chapter). No API key required — the agent does the LLM work. |
| [url-to-markdown](./url-to-markdown) | Convert any URL to clean Markdown. Tries fast plain-fetch first, auto-escalates to headless Chrome for SPAs / login-walled / anti-bot pages. Both paths feed the same Mozilla Readability + Turndown extractor. Optional summarize step has two sub-modes — single summary or per-chapter sections (designed to feed downstream chapter infographics). No API key required. |
| [pdf-to-markdown](./pdf-to-markdown) | Convert a PDF to clean Markdown via `markitdown[pdf]` (wrapped through `uvx`). Backed by `pdfminer.six` — works well on text-heavy / two-column academic PDFs. Same agent-orchestrated summarize sub-modes (single / per-chapter sections) as the other skills. No API key required. |
| [office-to-markdown](./office-to-markdown) | Convert `.docx`, `.pptx`, `.xlsx`, or `.csv` to clean Markdown via `markitdown` (wrapped through `uvx`). One skill, four formats — extension-dispatched internally. PowerPoint slides become `<!-- Slide number: N -->`-delimited blocks; Excel sheets become per-sheet GFM tables. Same agent-orchestrated summarize sub-modes. No API key required. |
| [audio-to-markdown](./audio-to-markdown) | Transcribe `.mp3` / `.wav` / `.m4a` to clean Markdown via `markitdown[audio-transcription]` (wrapped through `uvx`). Default backend is Google Web Speech (free tier, no API key) via `SpeechRecognition`; `ffmpeg` is a runtime prerequisite for non-PCM-WAV inputs. Same agent-orchestrated summarize sub-modes. |

## Conventions

- Every skill is **agent-orchestrated**: scripts do only deterministic work; the host agent (Claude Code, Codex) does the LLM work using user-tunable prompt files under each skill's `prompts/` directory.
- Every skill ships a `SKILL.md` (skill manifest), a `README.md` (install + tuning docs), and where applicable a `package.sh` (build a portable distribution zip).
- Scripts assume `bun` is available — typically invoked via `npx -y bun <skill>/scripts/main.ts ...` so `bun` is fetched on demand.
