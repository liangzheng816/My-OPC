---
name: office-to-markdown
description: Convert a Word document (.docx), PowerPoint deck (.pptx), Excel workbook (.xlsx), or CSV file to clean Markdown. Wraps Microsoft's `markitdown` library (via `uvx`) for the deterministic extraction. Two optional summarize sub-modes (host agent does the LLM work, no API key needed) - "single" produces one structured summary MD, "sections" auto-derives 3-8 chapter sections and writes one MD per section + an index (designed to feed downstream chapter infographics). Use when the user provides a `.docx` / `.pptx` / `.xlsx` / `.csv` file path or asks to "convert this Word doc", "extract this presentation", "spreadsheet to markdown", "summarize this report", "summarize this deck", or "break this report into chapter notes".
---

# Office to Markdown

One skill, four formats. Two stages, both deterministic from the script's perspective:

1. **Extract** — a Bun script invokes `uvx 'markitdown[docx,pptx,xlsx]==0.1.5' <input>` (CSV is built-in, no extras needed) and captures the resulting Markdown. Output: a clean Markdown file with YAML frontmatter at `<out>/<parent-dir>/<slug>.md`.
2. **Summarize** *(optional)* — *you* (the host agent) do the LLM work in this conversation. Two mutually exclusive sub-modes:
   - **2a. Single summary** — one summary MD via `prompts/summary.md` → `<slug>.summary.md`.
   - **2b. Sections** — auto-derive 3–8 chapter sections via `prompts/outline.md` + `prompts/section.md`, plus a deterministic index → `<slug>/00-index.md` + `<slug>/NN-<section>.md` × N.

## Format-specific behavior

| Extension | markitdown extras | What the body looks like |
|---|---|---|
| `.docx` | `[docx]` | Narrative MD with the document's headings. |
| `.pptx` | `[pptx]` | One block per slide, separated by `<!-- Slide number: N -->` markers. |
| `.xlsx` | `[xlsx]` | One `## SheetName` block per sheet, table-formatted. |
| `.csv` | (built-in) | A single Markdown table. |

The same `summary.md` / `outline.md` / `section.md` prompts handle all four — they branch on the `format` frontmatter field. For sections mode, slide-number markers and sheet headings work as natural `ANCHOR` values.

## When to use Step 2a vs Step 2b

| User intent | Path |
|---|---|
| "summarize this deck" / "what's this report about?" / "TL;DR of this spreadsheet" | Step 2a |
| "break this report into chapter notes" / "give me per-slide-group notes" / "make per-section infographics from this" | Step 2b |

## Script Directory

**Important**: All scripts are in the `scripts/` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`.
2. Script entry = `${SKILL_DIR}/scripts/main.ts`.
3. Replace all `${SKILL_DIR}` in this document with the actual path.

**Script Reference**:

| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | CLI entry. Subcommands: convert (default), `--check`, `--help`. Dispatches on file extension. |
| `scripts/markitdown.ts` | Spawns `uvx 'markitdown[<extras>]==<version>' <input>` and captures stdout / stderr. |
| `scripts/output.ts` | Slug rule, path resolution, YAML frontmatter assembly, format detection, word/slide/sheet counting. |

## Step 1 — Convert

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts <input> [--out <dir>] [options]
```

| Flag | Effect |
|---|---|
| `--out <dir>` | Output root (default: `./office-to-markdown`). |
| `--summarize` | After extraction, reminds you to run Step 2a in-conversation. |
| `--prompt <path>` | Override `prompts/summary.md` (only with `--summarize`). |

Exit code `0` = success (path written to stdout); `1` = tool/argument error (missing file, unsupported extension, `uv` not installed); `2` = conversion error (markitdown could not parse the file).

## Step 2a — Single summary

When the user asks to "summarize this", "give me a TL;DR", or similar after Step 1:

1. **Read the prompt template** at `${SKILL_DIR}/prompts/summary.md`. The header comment in that file documents the contract; the body is the system-prompt-style instructions you should follow.
2. **Read the extracted Markdown** produced in Step 1 (skip the YAML frontmatter when feeding the model — the body is what matters). Note the `format` field — it tells you whether you're summarizing prose (docx) or data (xlsx).
3. **Apply the prompt** in this conversation. Pass through the title / source path / format from the frontmatter as user-message context. Produce the structured Markdown output described by the prompt template — verbatim, no preamble or trailing commentary.
4. **Write the result** to `<out>/<parent-dir>/<slug>.summary.md` (same directory as the extracted file). Use the `Write` tool.

The prompt template is fully user-editable. Whatever structure it specifies is what you produce — the script does not parse the response.

## Step 2b — Per-chapter sections

When the user asks to "break this into chapter notes", "give me per-section notes", "make per-section infographics from this", or similar after Step 1, this is a **three-pass workflow you orchestrate yourself**.

### Pass A — Outline

1. Read `${SKILL_DIR}/prompts/outline.md`.
2. Read the extracted Markdown produced in Step 1 (skip the YAML frontmatter when feeding the model).
3. Apply the outline prompt to the document body. The prompt is engineered to make you emit blocks in this exact format:

   ```
   ### <Section Title>
   ANCHOR: <verbatim heading from source MD if present, else `<!-- Slide number: N -->` marker, else first sentence of the section>
   BRIEF: <one-sentence description>
   ```

4. **Parse your own response** by extracting one tuple per `###` heading: `title`, `anchor`, `brief`.

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
2. **Locate the section's content** in the source MD using `ANCHOR` as a hint. For pptx, the anchor may be a `<!-- Slide number: N -->` marker — slice all content between that marker and the next section's marker.
3. Apply the section prompt with this user-message context:

   ```
   Document: <title>
   Source: <file path>
   Format: <docx | pptx | xlsx | csv>
   Section <N> of <M>: <title>
   Brief: <brief>

   Excerpt:
   <regional content from the source MD>
   ```

4. Write the model's verbatim response to `<out>/<parent-dir>/<slug>/NN-<section-slug>.md`.

### Pass C — Index (deterministic, no LLM)

Write `<out>/<parent-dir>/<slug>/00-index.md` with this exact structure:

```markdown
# <Document Title>

> **Source:** <file path>
> **Format:** <docx / pptx / xlsx / csv>
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
office-to-markdown/<parent-dir>/<slug>.md            # Step 1: extracted file
office-to-markdown/<parent-dir>/<slug>.summary.md    # Step 2a: single summary
office-to-markdown/<parent-dir>/<slug>/00-index.md   # Step 2b: index
office-to-markdown/<parent-dir>/<slug>/NN-<section-slug>.md  # Step 2b: per-chapter
```

YAML frontmatter on the Step 1 extracted MD:

```yaml
---
source: <absolute path to input file>
title: <derived from filename>
format: docx | pptx | xlsx | csv
slide_count: <N>        # pptx only, best-effort
sheet_count: <N>        # xlsx only, best-effort
captured_at: <ISO 8601>
word_count: <N>
---
```

`<slug>` rule: lowercase, alphanumerics joined with `-`, ≤50 chars (derived from filename). Conflict resolution: append `-YYYYMMDD-HHMMSS`.

## Customizing the prompts

All three AI-driving prompts live under `${SKILL_DIR}/prompts/` as plain Markdown. Edit them to change output style, language, depth, or focus. **No code changes required.**

| File | Drives | Constraints |
|---|---|---|
| `prompts/summary.md` | Step 2a | Free-form. Branches on the `format` field. |
| `prompts/outline.md` | Step 2b Pass A | **Must keep the `### / ANCHOR: / BRIEF:` markers** — the agent extracts those values from its own response. |
| `prompts/section.md` | Step 2b Pass B | Free-form. The most important prompt to tune for downstream **infographic** generation. |

## Diagnostics

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts --check
```

Reports Bun version, Node version, prompt presence, and `uvx` detection.

## Environment Variables

| Variable | Default / fallback | Description |
|---|---|---|
| `OFFICEMD_DATA_DIR` | `./office-to-markdown` (cwd) | Output root override. |
| `MARKITDOWN_UVX` | auto-detected | `uvx` executable override. |

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Tool / argument error (bad path, unsupported extension, `uv` not installed) |
| `2` | Conversion error (markitdown could not parse the file) |
