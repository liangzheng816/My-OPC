# pdf-to-markdown

A Claude Code / Codex skill that converts a PDF file to clean Markdown.

Wraps Microsoft's [`markitdown`](https://github.com/microsoft/markitdown) library via [`uvx`](https://docs.astral.sh/uv/) — the deterministic conversion is offloaded to a battle-tested upstream, and the skill adds an agent-driven summarize workflow on top.

**No API key required.** The script does the deterministic extraction. The optional summarize step is performed by the host agent (Claude Code, Codex, etc.) using user-tunable prompts under `prompts/`. Two summarize sub-modes:

| Step | Who runs it | Output |
|---|---|---|
| 1. Extract | Bun script (`main.ts`) | `<out>/<parent-dir>/<slug>.md` (with YAML frontmatter) |
| 2a. Single summary *(optional)* | Host agent, using `prompts/summary.md` | `<out>/<parent-dir>/<slug>.summary.md` |
| 2b. Per-chapter sections *(optional)* | Host agent, using `prompts/outline.md` + `prompts/section.md` | `<out>/<parent-dir>/<slug>/00-index.md` + `NN-<section>.md` × N |

Step 2a and 2b are mutually exclusive — pick based on intent. Step 2b is the right choice when you want **per-chapter MDs as input to downstream chapter infographics**.

## Install

### Method A — git clone (preferred for users who want updates)

```bash
git clone https://github.com/liangzheng816/StandaloneSkills.git
ln -s "$(pwd)/StandaloneSkills/pdf-to-markdown" ~/.claude/skills/pdf-to-markdown
```

### Method B — zip drop-in (preferred when sharing the archive)

```bash
unzip pdf-to-markdown.zip -d ~/.claude/skills/
# -> creates ~/.claude/skills/pdf-to-markdown/
```

## Prerequisites

- **Bun** — fetched on demand via `npx -y bun`. No global install required.
- **`uv`** — one-time install: `pip install uv` (any Python ≥ 3.8) or `brew install uv` on macOS. The skill calls `uvx 'markitdown[pdf]==0.1.5'`, which `uvx` resolves and caches on first run. Subsequent runs are fast (offline-friendly).

## Quick test

```bash
npx -y bun ~/.claude/skills/pdf-to-markdown/scripts/main.ts --check
```

Reports Bun version, Node version, prompt presence, and `uvx` detection.

## Usage

```bash
SKILL=~/.claude/skills/pdf-to-markdown/scripts/main.ts

# Convert a single PDF (writes ./pdf-to-markdown/<parent>/<slug>.md)
npx -y bun "$SKILL" ~/Downloads/paper.pdf

# Custom output directory
npx -y bun "$SKILL" ~/Downloads/paper.pdf --out /tmp/md

# With summarize hint (the actual LLM step happens in the host agent)
npx -y bun "$SKILL" ~/Downloads/paper.pdf --summarize
```

### Inside Claude Code or Codex

Drop a PDF path with intent ("convert this PDF", "summarize this paper", "break this paper into chapter notes"). The host agent runs the script for extraction and — if you ask for a summary — applies `prompts/summary.md` (or `outline.md` + `section.md` for sections mode) in-conversation. See [`SKILL.md`](./SKILL.md) for the full agent-facing workflow.

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
cd ~/.claude/skills/pdf-to-markdown
./package.sh                # -> dist/pdf-to-markdown.zip
./package.sh v1.0.0         # -> dist/pdf-to-markdown-v1.0.0.zip
```

Hand the zip to a colleague; they `unzip pdf-to-markdown.zip -d ~/.claude/skills/`.

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Tool / argument error (bad path, missing flag value, `uv` not installed) |
| 2 | Conversion error (markitdown could not parse the PDF — image-only / DRM-protected / corrupt) |

## Environment variables

| Variable | Description |
|---|---|
| `PDFMD_DATA_DIR` | Override default output root (`./pdf-to-markdown`). |
| `MARKITDOWN_UVX` | Override the `uvx` binary path (default: auto-detected). |

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `uvx: NOT FOUND` in `--check` | Install `uv`: `pip install uv` or `brew install uv`. Or set `MARKITDOWN_UVX=/path/to/uvx`. |
| First run is slow (~30 s) | `uvx` is downloading and caching `markitdown[pdf]==0.1.5`. Subsequent runs are fast. |
| Exit code `2` with "produced no text" | The PDF is image-only (scanned without OCR layer) or DRM-protected. markitdown can't extract text in those cases — try Azure Document Intelligence or run OCR upstream. |
| Multi-column layout mangled | `pdfminer.six` does its best but can struggle with complex layouts. Inspect the output and re-run with a single-column PDF if available. |
| npm/Bun install fails behind a corporate proxy | Set `npm_config_registry` / proxy env vars. |

## What `markitdown[pdf]` is good at

- Text-heavy PDFs with selectable text (research papers, reports, contracts).
- Single or two-column layouts.
- Embedded fonts.
- Tables (best-effort).

## What it isn't good at

- Scanned PDFs without an OCR layer.
- DRM-protected / password-protected PDFs.
- Heavy graphic layouts where reading order is ambiguous.
- Forms with interactive fields.
