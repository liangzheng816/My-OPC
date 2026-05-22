# office-test — example reproduce instructions

This folder ships reproduce instructions rather than pre-rendered outputs, so the example is always tied to the source you pick. (If you want the pre-rendered version, run the steps below.)

## Reproduce — recommended source

A clean public option is [**markitdown's own test PPTX fixture**](https://github.com/microsoft/markitdown/blob/main/packages/markitdown/tests/test_files/test.pptx) (MIT licensed). It's a 6-slide deck — a brief overview of Microsoft's [AutoGen](https://github.com/microsoft/autogen) multi-agent framework plus deliberate parser-test slides for tables, charts, nested shapes, and image-OCR. We used it when validating this skill:

```bash
# Prerequisites (one-time)
brew install uv      # or: pip install uv

# Step 1 — convert
SKILL=~/.claude/skills/office-to-markdown/scripts/main.ts
curl -L -o test.pptx \
  "https://github.com/microsoft/markitdown/raw/main/packages/markitdown/tests/test_files/test.pptx"
npx -y bun "$SKILL" ./test.pptx --out ./office-test
```

The first run downloads `markitdown[docx,pptx,xlsx]==0.1.5` into the `uvx` cache (~30 s); subsequent runs are fast.

Step 2a / 2b are then performed by the host agent in a Claude Code / Codex session — paste the file path with intent ("summarize this deck" → 2a; "break this deck into slide-group notes" → 2b) and the agent follows the workflow in [SKILL.md](../SKILL.md).

## Other formats supported by the same skill

This skill handles four extensions through one CLI; the example above uses `.pptx`, but the dispatcher detects the format from the extension and the body structure differs accordingly:

| Extension | Frontmatter extras | Body structure |
|---|---|---|
| `.docx` | (none beyond shared) | Standard prose with the document's headings preserved. |
| `.pptx` | `slide_count` | Slide-by-slide body separated by `<!-- Slide number: N -->` markers. |
| `.xlsx` | `sheet_count` | One `## SheetName` block per sheet, each containing a GFM table. |
| `.csv` | (none beyond shared) | A single GFM table. |

To try the other formats, just swap the input file — no flags need to change.

## What you should see

Approximate output shape after running Steps 1, 2a, and 2b on a `.pptx`:

```
office-test/
└── <parent-dir>/
    ├── <slug>.md                     # Step 1: extracted slide stream (frontmatter: format: pptx, slide_count: N)
    ├── <slug>.summary.md             # Step 2a: single-MD summary (host agent)
    └── <slug>/                       # Step 2b: per-chapter (host agent)
        ├── 00-index.md               # deterministic table of contents
        ├── 01-*.md
        ...
        └── 0N-*.md                   # 3-8 chapter MDs total
```

For a `.docx`, the `.md` body is prose with `# Heading` lines instead of slide markers. For `.xlsx`, the body has one `## SheetName` block per sheet. For `.csv`, the body is a single GFM table.

## What this skill is good at

- **Modern Office XML formats** — `.docx`, `.pptx`, `.xlsx`, and plain `.csv`.
- **Tables and charts in PowerPoint** — extracted as GFM tables (chart data, not chart visuals).
- **Slide markers** — `<!-- Slide number: N -->` boundaries make sectioning trivial in Step 2b.

## What this skill isn't good at

- **Legacy formats** — `.doc` / `.ppt` / `.xls` are NOT supported. Convert to the modern format upstream.
- **Embedded images** — image binaries are not extracted, only image references with alt text. Use Tesseract / Azure DocIntel / a VLM upstream if you need OCR of pixel-embedded text.
- **Comment threads** — flattened to plain paragraphs in slide order; original threading is lost.

## Compare against url-to-markdown / youtube-to-markdown test folders

The `url-test/` and `youtube-test/` folders in this repo ship full pre-rendered outputs because their sources were ad-hoc choices the maintainer wanted to preserve. The `office-test/` reproduce-only pattern lets the example track the source you care about.
