# pdf-test — example reproduce instructions

This folder ships reproduce instructions rather than pre-rendered outputs, so the example is always tied to the source you pick rather than to a specific file we shipped. (If you want the pre-rendered version, run the steps below — output goes into this directory.)

## Reproduce — recommended source

A clean public option is any recent arXiv preprint — they're publicly redistributable and have well-defined section structure that Step 2b can carve into chapters. We used [**Glyph: Scaling Context Windows via Visual-Text Compression**](https://arxiv.org/abs/2510.17800) (arXiv:2510.17800) when validating this skill:

```bash
# Prerequisites (one-time)
brew install uv      # or: pip install uv

# Step 1 — convert
SKILL=~/.claude/skills/pdf-to-markdown/scripts/main.ts
curl -L -o glyph.pdf "https://arxiv.org/pdf/2510.17800.pdf"
npx -y bun "$SKILL" ./glyph.pdf --out ./pdf-test
```

The first run downloads `markitdown[pdf]==0.1.5` into the `uvx` cache (~30 s); subsequent runs are fast.

Step 2a / 2b are then performed by the host agent in a Claude Code / Codex session — paste the file path with intent ("give me a TL;DR" → 2a; "break this paper into chapter notes" → 2b) and the agent follows the workflow in [SKILL.md](../SKILL.md).

## What you should see

Approximate output shape after running Steps 1, 2a, and 2b:

```
pdf-test/
└── <parent-dir>/
    ├── <slug>.md                     # Step 1: extracted PDF text (~13,000+ words for Glyph)
    ├── <slug>.summary.md             # Step 2a: single-MD summary (host agent)
    └── <slug>/                       # Step 2b: per-chapter (host agent)
        ├── 00-index.md               # deterministic table of contents (no LLM)
        ├── 01-*.md
        ├── 02-*.md
        ...
        └── 0N-*.md                   # 3-8 chapter MDs total
```

Slug is derived from the input filename: lowercase, alphanumerics joined with `-`, truncated to 50 chars. `<parent-dir>` defaults to the slug-normalized name of the input file's parent directory.

## What this skill is good at

- **Text-heavy PDFs with selectable text** — research papers, reports, contracts.
- **Single or two-column layouts** with reasonably consistent typography.
- **Tables** (best-effort — `pdfminer.six` extracts table content but the output may include `|     |     |` artifacts where the source PDF used multi-cell layouts).

## What this skill isn't good at

- **Scanned PDFs without an OCR layer** — `pdfminer.six` extracts no text; you need OCR upstream.
- **DRM-protected / password-protected PDFs.**
- **Heavy graphic layouts** where reading order is ambiguous.

For higher-fidelity extraction, route through Azure Document Intelligence — out of scope for this skill.

## Compare against url-to-markdown / youtube-to-markdown test folders

The `url-test/` and `youtube-test/` folders in this repo ship full pre-rendered outputs because their sources (an X thread / a YouTube video) were ad-hoc choices the maintainer wanted to preserve as concrete examples. The `pdf-test/` reproduce-only pattern is offered as a forward-looking alternative — it lets the example track the source you actually care about, not the one we used.
