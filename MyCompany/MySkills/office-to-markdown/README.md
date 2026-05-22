# office-to-markdown

A Claude Code / Codex skill that converts a Word document, PowerPoint deck, Excel workbook, or CSV file to clean Markdown.

Wraps Microsoft's [`markitdown`](https://github.com/microsoft/markitdown) library via [`uvx`](https://docs.astral.sh/uv/) — the deterministic conversion is offloaded to a battle-tested upstream, and the skill adds an agent-driven summarize workflow on top.

**No API key required.** The script does the deterministic extraction. The optional summarize step is performed by the host agent (Claude Code, Codex, etc.) using user-tunable prompts under `prompts/`. Two summarize sub-modes:

| Step | Who runs it | Output |
|---|---|---|
| 1. Extract | Bun script (`main.ts`) | `<out>/<parent-dir>/<slug>.md` (with YAML frontmatter) |
| 2a. Single summary *(optional)* | Host agent, using `prompts/summary.md` | `<out>/<parent-dir>/<slug>.summary.md` |
| 2b. Per-chapter sections *(optional)* | Host agent, using `prompts/outline.md` + `prompts/section.md` | `<out>/<parent-dir>/<slug>/00-index.md` + `NN-<section>.md` × N |

## Supported extensions

| Extension | Source format |
|---|---|
| `.docx` | Microsoft Word |
| `.pptx` | Microsoft PowerPoint |
| `.xlsx` | Microsoft Excel |
| `.csv` | Comma-separated values |

Legacy `.doc` / `.ppt` / `.xls` are not supported by markitdown. Convert to the modern format first (Word's "Save As", LibreOffice, etc.).

## Install

### Method A — git clone (preferred for users who want updates)

```bash
git clone https://github.com/liangzheng816/StandaloneSkills.git
ln -s "$(pwd)/StandaloneSkills/office-to-markdown" ~/.claude/skills/office-to-markdown
```

### Method B — zip drop-in (preferred when sharing the archive)

```bash
unzip office-to-markdown.zip -d ~/.claude/skills/
# -> creates ~/.claude/skills/office-to-markdown/
```

## Prerequisites

- **Bun** — fetched on demand via `npx -y bun`. No global install required.
- **`uv`** — one-time install: `pip install uv` or `brew install uv`. The skill calls `uvx 'markitdown[docx,pptx,xlsx]==0.1.5'`, which `uvx` resolves and caches on first run.

## Quick test

```bash
npx -y bun ~/.claude/skills/office-to-markdown/scripts/main.ts --check
```

## Usage

```bash
SKILL=~/.claude/skills/office-to-markdown/scripts/main.ts

# Word document
npx -y bun "$SKILL" ~/Documents/report.docx

# PowerPoint deck
npx -y bun "$SKILL" ~/Documents/deck.pptx

# Excel workbook
npx -y bun "$SKILL" ~/Documents/budget.xlsx

# CSV
npx -y bun "$SKILL" ~/Documents/users.csv

# Custom output directory
npx -y bun "$SKILL" ~/Documents/report.docx --out /tmp/md
```

### Inside Claude Code or Codex

Drop the file path with intent ("convert this Word doc", "summarize this deck", "break this report into chapter notes"). The host agent dispatches on extension and applies the right `prompts/*.md` in-conversation if a summarize step is requested. See [`SKILL.md`](./SKILL.md) for the full agent-facing workflow.

## Tuning the prompts

Three plain-Markdown prompts under `prompts/` drive the AI steps. Edit freely — the agent applies them in-conversation; no code changes required.

| File | Drives | Constraint |
|---|---|---|
| `prompts/summary.md` | Step 2a (single summary) | Free-form. Branches on the `format` frontmatter field. |
| `prompts/outline.md` | Step 2b Pass A (auto-derive sections) | **Must keep the `### / ANCHOR: / BRIEF:` markers** — the agent regex-extracts those values. |
| `prompts/section.md` | Step 2b Pass B (per-chapter MDs) | Free-form. **Most important prompt to tune for downstream chapter-infographic generation**. |

## Build / package for distribution

```bash
cd ~/.claude/skills/office-to-markdown
./package.sh                # -> dist/office-to-markdown.zip
./package.sh v1.0.0         # -> dist/office-to-markdown-v1.0.0.zip
```

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Tool / argument error (bad path, unsupported extension, `uv` not installed) |
| 2 | Conversion error (markitdown could not parse the file) |

## Environment variables

| Variable | Description |
|---|---|
| `OFFICEMD_DATA_DIR` | Override default output root (`./office-to-markdown`). |
| `MARKITDOWN_UVX` | Override the `uvx` binary path. |

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `uvx: NOT FOUND` in `--check` | Install `uv`: `pip install uv` or `brew install uv`. |
| First run is slow | `uvx` is downloading and caching `markitdown[docx,pptx,xlsx]==0.1.5`. Subsequent runs are fast. |
| `.doc` / `.ppt` / `.xls` rejected | Legacy formats are not supported. Convert to the modern `.docx` / `.pptx` / `.xlsx` first. |
| pptx slide order looks wrong | markitdown reads slides in XML order, which is usually but not always presentation order. Check the source deck. |
| xlsx output is huge | Wide tables produce wide Markdown tables. Use `--out` to keep them out of your main tree. |
| Embedded images dropped | markitdown does not extract image content. Use a vision pipeline upstream if needed. |
