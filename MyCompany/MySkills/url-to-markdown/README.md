# url-to-markdown

A Claude Code / Codex skill that converts any URL to clean Markdown.

**The "best of both worlds" combination:**

- **Plain HTTP fetch** path for static pages (~1–3 s, ~30–80 MB RAM, no Chrome needed).
- **Headless Chrome via CDP** auto-fallback for SPAs, login walls, lazy-loaded content, and anti-bot challenges.
- Both paths feed the **same** Mozilla Readability + Turndown (with GFM plugin) extractor — clean article isolation regardless of source.

**No API key required.** The script does the deterministic extraction. The optional summarize step is performed by the host agent (Claude Code, Codex, etc.) using user-tunable prompts under `prompts/`. Two summarize sub-modes:

| Step | Who runs it | Output |
|---|---|---|
| 1. Extract | Bun script (`main.ts`) | `<out>/<domain>/<slug>.md` (with YAML frontmatter) |
| 2a. Single summary *(optional)* | Host agent, using `prompts/summary.md` | `<out>/<domain>/<slug>.summary.md` |
| 2b. Per-chapter sections *(optional)* | Host agent, using `prompts/outline.md` + `prompts/section.md` | `<out>/<domain>/<slug>/00-index.md` + `NN-<section>.md` × N |

Step 2a and 2b are mutually exclusive — pick based on intent. Step 2b is the right choice when you want **per-chapter MDs as input to downstream chapter infographics**.

## Install

### Method A — git clone (preferred for users who want updates)

```bash
git clone https://github.com/liangzheng816/StandaloneSkills.git
ln -s "$(pwd)/StandaloneSkills/url-to-markdown" ~/.claude/skills/url-to-markdown
```

### Method B — zip drop-in (preferred when sharing the archive)

```bash
unzip url-to-markdown.zip -d ~/.claude/skills/
# -> creates ~/.claude/skills/url-to-markdown/
```

## Prerequisites

- **Bun** — fetched on demand via `npx -y bun`. No global install required. The script auto-installs `jsdom`, `@mozilla/readability`, `turndown`, `turndown-plugin-gfm` on first run.
- **Chrome / Chromium / Edge** — only needed for the auto-escalation fallback (`--chrome`, or auto-mode against SPAs / bot-blocked pages). Auto-detected on macOS, Linux, Windows.

## Quick test

```bash
npx -y bun ~/.claude/skills/url-to-markdown/scripts/main.ts --check
```

Reports Bun version, Node version, prompt presence, and Chrome detection.

## Usage

### Default (auto mode)

```bash
SKILL=~/.claude/skills/url-to-markdown/scripts/main.ts

# Static blog post / docs / news article — uses fast fetch path
npx -y bun "$SKILL" "https://example.com/article" --out /tmp/md

# SPA / bot-blocked page — auto-escalates to Chrome silently
npx -y bun "$SKILL" "https://twitter.com/some/status" --out /tmp/md
```

### Explicit modes

```bash
# Force fetch only — exit 2 if insufficient
npx -y bun "$SKILL" <url> --fetch-only

# Force Chrome (skip fetch attempt)
npx -y bun "$SKILL" <url> --chrome

# Login mode: Chrome opens visibly, user authenticates, press Enter to capture
npx -y bun "$SKILL" <url> --chrome --wait
```

### Inside Claude Code or Codex

Paste any URL with intent ("save this as markdown", "give me a TL;DR of this article", etc.). The host agent will run the script for extraction and — if you ask for a summary — apply `prompts/summary.md` in-conversation. See [`SKILL.md`](./SKILL.md) for the full agent-facing workflow.

## Tuning the prompts

Three plain-Markdown prompts under `prompts/` drive the AI steps. Edit freely — the agent applies them in-conversation; no code changes required.

| File | Drives | Constraint |
|---|---|---|
| `prompts/summary.md` | Step 2a (single summary) | Free-form. Whatever structure the prompt specifies, the agent produces. |
| `prompts/outline.md` | Step 2b Pass A (auto-derive sections) | **Must keep the `### / ANCHOR: / BRIEF:` markers** — the agent regex-extracts those values from its own response. Counts, language, tone are editable. |
| `prompts/section.md` | Step 2b Pass B (per-chapter MDs) | Free-form. **Most important prompt to tune for downstream chapter-infographic generation** — each chapter MD is the input to that step. |

Common tweaks (no code change):

- **Output language** — prepend "Output in {language}" near the top of any prompt.
- **Different structure** — rewrite the template block in `summary.md` or `section.md`. (Don't change the markers in `outline.md`.)
- **Different depth** — adjust per-section bullet/paragraph counts.
- **Section count** — edit `outline.md` to "produce exactly N sections" within the 3–8 range.

## Build / package for distribution

```bash
cd ~/.claude/skills/url-to-markdown
./package.sh                # -> dist/url-to-markdown.zip
./package.sh v1.0.0         # -> dist/url-to-markdown-v1.0.0.zip
```

Hand the zip to a colleague; they `unzip url-to-markdown.zip -d ~/.claude/skills/`.

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Tool / argument error (bad URL, missing flag value, invalid mode combination) |
| 2 | Page-side error (best-effort extraction insufficient) |

## Environment variables

| Variable | Description |
|---|---|
| `URLMD_DATA_DIR` | Override default output root (`./url-to-markdown`). |
| `URLMD_CHROME_PATH` | Override Chrome executable. |
| `URLMD_CHROME_PROFILE_DIR` | Override Chrome profile dir. Independent from `baoyu-url-to-markdown`. |

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `Chrome executable not found` | Install Chrome/Chromium/Edge, or set `URLMD_CHROME_PATH`. |
| Auto-mode escalates on every request | The site sets `<div id="root">`/`<div id="app">` even when content is server-rendered. Use `--fetch-only` if you trust the content is in the initial HTML. |
| Output has stray sidebar / CTA fragments | Readability misclassified. Try `--chrome` (richer rendered DOM may help) or report the URL. |
| `npx -y bun` is slow on first run | Bun is being fetched and cached. Subsequent runs are fast. |
| npm install fails behind a corporate proxy | Set `npm_config_registry` / proxy env vars. |

## When to use this skill vs. baoyu-url-to-markdown

This skill is the **better default** for any "URL to MD" intent — Readability gives much cleaner article isolation than a selector blacklist, Turndown handles tables / nested lists / code blocks correctly, and the auto-escalation hides the fetch-vs-Chrome distinction from the user.

`baoyu-url-to-markdown` is still useful when you want a **stateful login session** persisted in its dedicated Chrome profile (this skill keeps a separate profile, but `baoyu-url-to-markdown`'s ergonomics around `--wait` for repeat-login workflows are well-trodden).
