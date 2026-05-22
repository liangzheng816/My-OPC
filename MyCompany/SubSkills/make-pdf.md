# /make-pdf

> Turn any markdown file into a publication-quality PDF — proper margins, page numbers, optional cover and TOC.

## Summary

`/make-pdf` converts `.md` to a finished PDF that looks like a Faber & Faber essay: 1in margins, Helvetica throughout (Liberation Sans on Linux), curly quotes, em dashes, clickable TOC, intelligent page breaks at H1s, running header, page numbers, optional cover and diagonal DRAFT watermark. Crucially, copy-paste from the PDF produces real words — no "S a i l i n g" letter fragmentation. The point is finished artifact, not draft preview.

## When to use

- You have a memo, essay, letter, or report in markdown and want a sharable PDF
- A draft needs a DRAFT watermark before it circulates
- Voice/text aliases: "make a PDF", "export to PDF", "turn this markdown into a PDF", "generate a document", "make this a pdf", "pdf this markdown"
- After any planning skill (`/plan-ceo-review`, `/office-hours`) when the user wants the design doc as a PDF

## Sample prompts

```text
/make-pdf essay.md
make a PDF of letter.md with my name on the cover
export design-doc.md as a PDF with a clickable TOC
turn this markdown into a draft PDF with a DRAFT watermark
$P generate --cover --toc --author "Garry Tan" --title "On Horizons" essay.md essay.pdf
pdf this markdown — no CONFIDENTIAL footer, A4 page size
preview essay.md in the browser first, I'll iterate
```

## How it works

- Built on a single binary at `<skill>/dist/pdf` (built by `./setup` in the gstack repo). The skill resolves it to `$P` for portability.
- Core commands: `$P generate <input.md> [output.pdf]` (80% case), `$P preview <input.md>` (renders HTML in browser for fast iteration), `$P setup` (smoke test).
- Flags cover layout (`--cover`, `--toc`, `--no-chapter-breaks`), branding (`--watermark`, `--header-template`, `--no-confidential`), output (`--page-numbers`, `--tagged`, `--outline`), and metadata (`--title`, `--author`, `--date`).
- Output contract: stdout is exactly the output path (one line); stderr carries progress unless `--quiet`. Exit codes: 0 success / 1 bad args / 2 render error / 3 Paged.js timeout / 4 browse daemon unavailable.
- Network fetches for external images are off by default (blocks tracking pixels); use `--allow-network` if needed.

## Notes

Linux users should install `fonts-liberation` so Helvetica falls back correctly. If headings are missing the `--toc` flag will time out — drop it for short memos. Fenced code blocks currently fragment on copy-paste (highlight.js limitation); strip them as a workaround.

## See also

`/office-hours`, `/plan-ceo-review`, `/plan-eng-review` — these produce design docs and CEO plans that are natural inputs for `/make-pdf`.
