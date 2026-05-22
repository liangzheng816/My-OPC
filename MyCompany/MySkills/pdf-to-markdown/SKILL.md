---
name: pdf-to-markdown
description: Convert a PDF file to clean Markdown. Wraps Microsoft's `markitdown` library (via `uvx`) for the deterministic extraction. Two optional summarize sub-modes (host agent does the LLM work, no API key needed) - "single" produces one structured summary MD, "sections" auto-derives 3-8 chapter sections and writes one MD per section + an index (designed to feed downstream chapter infographics). Use when the user provides a `.pdf` file path or asks to "convert this PDF", "extract text from this PDF", "summarize this paper", "give me a TL;DR of this PDF", "break this paper into chapter notes", or "make per-chapter infographics from this PDF".
---

# PDF to Markdown

Two stages, both deterministic from the script's perspective:

1. **Extract** — a Bun script invokes `uvx 'markitdown[pdf]==0.1.5' <input.pdf>` and captures the resulting Markdown. Output: a clean Markdown file with YAML frontmatter at `<out>/<parent-dir>/<slug>.md`.
2. **Summarize** *(optional)* — *you* (the host agent) do the LLM work in this conversation. Two mutually exclusive sub-modes:
   - **2a. Single summary** — one summary MD via `prompts/summary.md` → `<slug>.summary.md`.
   - **2b. Sections** — auto-derive 3–8 chapter sections via `prompts/outline.md` + `prompts/section.md`, plus a deterministic index → `<slug>/00-index.md` + `<slug>/NN-<section>.md` × N.

`markitdown[pdf]` uses `pdfminer.six` under the hood — it handles complex layouts, embedded fonts, and multi-column text reasonably well. For higher-fidelity / scanned PDFs, users should fall back to Azure Document Intelligence (out of scope for this skill).

## When to use Step 2a vs Step 2b

| User intent | Path |
|---|---|
| "summarize this PDF" / "give me a TL;DR" / "what's it about?" | Step 2a |
| "break this paper into chapter notes" / "give me per-section notes" / "make per-chapter infographics from this PDF" / "split this for downstream processing" | Step 2b |

The sub-modes are mutually exclusive. If the user wants both, run them in sequence — they don't conflict on disk (`<slug>.summary.md` is a sibling of `<slug>/00-index.md`).

## Script Directory

**Important**: All scripts are in the `scripts/` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`.
2. Script entry = `${SKILL_DIR}/scripts/main.ts`.
3. Replace all `${SKILL_DIR}` in this document with the actual path.

**Script Reference**:

| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | CLI entry. Subcommands: convert (default), `--check`, `--help`. |
| `scripts/markitdown.ts` | Spawns `uvx 'markitdown[pdf]==<version>' <input>` and captures stdout / stderr. |
| `scripts/output.ts` | Slug rule, path resolution, YAML frontmatter assembly, word counting. |

## Step 1 — Convert

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts <input.pdf> [--out <dir>] [options]
```

| Flag | Effect |
|---|---|
| `--out <dir>` | Output root (default: `./pdf-to-markdown`). |
| `--summarize` | After extraction, reminds you to run Step 2a in-conversation. |
| `--prompt <path>` | Override `prompts/summary.md` (only with `--summarize`). |

Exit code `0` = success (path written to stdout); `1` = tool/argument error (missing file, `uv` not installed); `2` = page-side error (markitdown could not parse the PDF, image-only / DRM-protected).

## Step 2a — Single summary

When the user asks to "summarize this PDF", "give me a TL;DR", or similar after Step 1:

1. **Read the prompt template** at `${SKILL_DIR}/prompts/summary.md`. The header comment in that file documents the contract; the body is the system-prompt-style instructions you should follow.
2. **Read the extracted Markdown** produced in Step 1 (skip the YAML frontmatter when feeding the model — the body is what matters).
3. **Apply the prompt** in this conversation. Pass through the title / source path from the frontmatter as user-message context. Produce the structured Markdown output described by the prompt template — verbatim, no preamble or trailing commentary.
4. **Write the result** to `<out>/<parent-dir>/<slug>.summary.md` (same directory as the extracted file). Use the `Write` tool.

The prompt template is fully user-editable. Whatever structure it specifies is what you produce — the script does not parse the response.

## Step 2b — Per-chapter sections

When the user asks to "break this into chapter notes", "give me per-section notes", "make per-chapter infographics from this PDF", or similar after Step 1, this is a **three-pass workflow you orchestrate yourself**.

### Pass A — Outline

1. Read `${SKILL_DIR}/prompts/outline.md`.
2. Read the extracted Markdown produced in Step 1 (skip the YAML frontmatter when feeding the model).
3. Apply the outline prompt to the document body. The prompt is engineered to make you emit blocks in this exact format:

   ```
   ### <Section Title>
   ANCHOR: <verbatim heading from source MD if present, else first sentence of the section>
   BRIEF: <one-sentence description>
   ```

4. **Parse your own response** by extracting one tuple per `###` heading:
   - `title` — the text after `### `.
   - `anchor` — the text after `ANCHOR:`.
   - `brief` — the text after `BRIEF:`.

5. Validate:
   - 3–8 sections.
   - Each `anchor` appears verbatim somewhere in the source MD body.
   - Each `brief` is non-empty and is one sentence.
   - Sections are in source order.

   If validation fails, write your raw outline response to `<out>/<parent-dir>/<slug>/_outline-raw.md` for the user, explain the failure, and stop.

### Pass B — Per-chapter MDs (parallel-friendly)

Compute filenames first: for the `i`-th section (1-indexed), filename = `NN-<section-slug>.md` where `NN` is zero-padded (`01`, `02`, …) and `<section-slug>` follows the same rule as the document slug (lowercase, alphanumerics joined with `-`, ≤50 chars).

For each section, in parallel where reasonable:

1. Read `${SKILL_DIR}/prompts/section.md`.
2. **Locate the section's content** in the source MD using `ANCHOR` as a hint: the section's content runs from the anchor line to the next section's anchor (or end of document).
3. Apply the section prompt with this user-message context:

   ```
   Document: <title>
   Source: <file path>
   Section <N> of <M>: <title>
   Brief: <brief>

   Document excerpt:
   <regional content from the source MD>
   ```

4. Write the model's verbatim response to `<out>/<parent-dir>/<slug>/NN-<section-slug>.md`.

### Pass C — Index (deterministic, no LLM)

Write `<out>/<parent-dir>/<slug>/00-index.md` with this exact structure:

```markdown
# <Document Title>

> **Source:** <file path>
> **Generated:** <YYYY-MM-DD>

---

## Sections

| # | Section | Brief |
|---|---------|-------|
| 01 | [<title>](./01-<slug>.md) | <brief> |
| 02 | [<title>](./02-<slug>.md) | <brief> |
…
```

## Output

```
pdf-to-markdown/<parent-dir>/<slug>.md            # Step 1: extracted document
pdf-to-markdown/<parent-dir>/<slug>.summary.md    # Step 2a: single summary
pdf-to-markdown/<parent-dir>/<slug>/00-index.md   # Step 2b: index
pdf-to-markdown/<parent-dir>/<slug>/NN-<section-slug>.md  # Step 2b: per-chapter
```

`<parent-dir>` = `basename(dirname(absoluteInputPath))`, slug-normalized. So `~/Downloads/paper.pdf` lands at `./pdf-to-markdown/downloads/paper.md`.

YAML frontmatter on the Step 1 extracted MD:

```yaml
---
source: <absolute path to input PDF>
title: <derived from filename>
format: pdf
captured_at: <ISO 8601>
word_count: <N>
---
```

`<slug>` rule: lowercase, alphanumerics joined with `-`, ≤50 chars (derived from filename). Conflict resolution: append `-YYYYMMDD-HHMMSS`.

## Customizing the prompts

All three AI-driving prompts live under `${SKILL_DIR}/prompts/` as plain Markdown. Edit them to change output style, language, depth, or focus. **No code changes required.**

| File | Drives | Constraints |
|---|---|---|
| `prompts/summary.md` | Step 2a | Free-form. Whatever structure the prompt specifies, the agent produces. |
| `prompts/outline.md` | Step 2b Pass A | **Must keep the `### / ANCHOR: / BRIEF:` markers** — the agent extracts those values from its own response. Everything else (counts, language, tone) is editable. |
| `prompts/section.md` | Step 2b Pass B | Free-form. This is the most important prompt to tune for downstream **infographic** generation, since each chapter MD is the input to that step. |

Common tweaks (no code change required):

- **Output language** — prepend "Output in {language}." near the top.
- **Format** — rewrite the structure block in `summary.md` and `section.md` (`outline.md` must keep its markers).
- **Depth** — adjust per-section bullet/paragraph counts.

## Diagnostics

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts --check
```

Reports Bun version, Node version, prompt presence, and `uvx` detection (required for markitdown).

## Environment Variables

| Variable | Default / fallback | Description |
|---|---|---|
| `PDFMD_DATA_DIR` | `./pdf-to-markdown` (cwd) | Output root override. |
| `MARKITDOWN_UVX` | auto-detected (`~/.local/bin/uvx`, `/opt/homebrew/bin/uvx`, `$PATH`) | `uvx` executable override. |

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Tool / argument error (bad path, missing flag value, `uv` not installed) |
| `2` | Conversion error (markitdown could not parse the PDF — image-only / DRM-protected / corrupt) |
