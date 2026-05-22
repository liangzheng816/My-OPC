---
name: url-to-markdown
description: Convert any URL to clean Markdown. Tries a fast plain-fetch first; if the page is a SPA / login-walled / anti-bot-protected, automatically escalates to headless Chrome. Output goes through Mozilla Readability + Turndown (with GFM) for clean article extraction with no nav/footer/sidebar noise. Two optional summarize sub-modes (host agent does the LLM work, no API key needed) - "single" produces one structured summary MD, "sections" auto-derives 3-8 chapter sections and writes one MD per section + an index (designed to feed downstream chapter infographics). Use when the user pastes any web URL or asks to "save this page as markdown", "convert this URL", "summarize this article", "give me a TL;DR", "break this article into chapter notes", "give me per-section notes", or "make per-chapter infographics from this article".
---

# URL to Markdown

Two stages, both deterministic from the script's perspective:

1. **Extract** — a Bun script fetches the page (plain HTTP first, headless Chrome on failure) and pipes the HTML through Mozilla Readability + Turndown (with the GFM plugin). Output: a clean Markdown file with YAML frontmatter at `<out>/<domain>/<slug>.md`.
2. **Summarize** *(optional)* — *you* (the host agent) do the LLM work in this conversation. Two mutually exclusive sub-modes:
   - **2a. Single summary** — one summary MD via `prompts/summary.md` → `<slug>.summary.md`.
   - **2b. Sections** — auto-derive 3–8 chapter sections via `prompts/outline.md` + `prompts/section.md`, plus a deterministic index → `<slug>/00-index.md` + `<slug>/NN-<section>.md` × N.

This skill combines the two URL→MD approaches available locally:

- The fast/clean **Readability + Turndown** pipeline (originally in [`MDConverter/md-converter/server/converter.js`](https://github.com/liangzheng816/StandaloneSkills)) — best output quality on article-style pages.
- A **headless Chrome via CDP** fallback (modeled after `baoyu-url-to-markdown`) — handles SPAs, login walls, lazy-loaded content, and anti-bot challenges that plain `fetch` can't.

Both paths feed the **same** Readability + Turndown extractor, so output quality is consistent regardless of which path produced the HTML.

## When to use this skill vs. baoyu-url-to-markdown

Prefer **this skill** as the default for any "convert URL to markdown" intent:

- Article-style pages (blog posts, docs, news, Substack, MDN, GitHub READMEs) — Readability gives much cleaner article isolation than a selector blacklist.
- Tables, code blocks, nested lists — Turndown handles them correctly; the regex converter in `baoyu-url-to-markdown` breaks on nested structures.
- Speed — fetch path is ~1–3 s; Chrome only when needed.

Prefer **`baoyu-url-to-markdown`** when:
- The user explicitly wants a stateful login session that persists across runs in `baoyu`'s own Chrome profile.
- This skill's auto-escalation still doesn't produce usable output and you want the user to drive the page interactively before capture.

## When to use Step 2a vs Step 2b

| User intent | Path |
|---|---|
| "summarize this article" / "give me a TL;DR" / "what's it about?" | Step 2a |
| "break this into chapter notes" / "give me per-section notes" / "make per-chapter infographics from this" / "split this for downstream processing" | Step 2b |

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
| `scripts/extract.ts` | HTML → Markdown via Readability + Turndown + GFM. Shared by both paths. |
| `scripts/fetch-path.ts` | Plain HTTP fetch + extract. Detects when escalation is needed. |
| `scripts/chrome-path.ts` | CDP launch / load / scroll / capture rendered HTML + extract. |
| `scripts/cdp.ts` | WebSocket Chrome DevTools Protocol client (no LLM, no API key). |
| `scripts/output.ts` | Slug rule, path resolution, YAML frontmatter assembly. |

## Step 1 — Convert

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts <url> [--out <dir>] [options]
```

Default mode is **auto**: try plain fetch first; if any of these escalation triggers fire, fall back to headless Chrome and retry:

| Trigger | Detection |
|---|---|
| HTTP error | status ≥ 400 (e.g., Cloudflare 403) |
| Bot block | response body contains markers like `Just a moment...`, `Verifying you are human`, `checking your browser`, `<title>Access Denied`, `enable JavaScript and cookies` |
| Low content | extracted Markdown has fewer than 50 words |
| SPA shell | empty `<div id="root">`, `<div id="app">`, or `<div id="__next">` |

Override flags:

| Flag | Effect |
|---|---|
| `--fetch-only` | Never launch Chrome. Exits with code `2` if fetch is insufficient. |
| `--chrome` | Skip the fetch attempt; go straight to Chrome. |
| `--chrome --wait` | Chrome opens **visibly**; user logs in / interacts; press Enter to capture. |
| `--ignore-links` | Drop hyperlinks in the output (still renders the link text). |
| `--out <dir>` | Output root (default: `./url-to-markdown`). |

Each escalation logs a stderr line: `Fetch insufficient (<reason>) — escalating to Chrome…` so you know why the slow path kicked in.

Exit code `0` = success (path written to stdout); `1` = tool/argument error; `2` = page-side error (e.g., Chrome retry exhausted).

## Step 2a — Single summary

When the user asks to "summarize this article", "give me a TL;DR", or similar after Step 1:

1. **Read the prompt template** at `${SKILL_DIR}/prompts/summary.md`. The header comment in that file documents the contract; the body is the system-prompt-style instructions you should follow.
2. **Read the extracted Markdown** produced in Step 1 (skip the YAML frontmatter when feeding the model — the body is what matters).
3. **Apply the prompt** in this conversation. Pass through the title / source URL / author / published from the frontmatter as user-message context. Produce the structured Markdown output described by the prompt template — verbatim, no preamble or trailing commentary.
4. **Write the result** to `<out>/<domain>/<slug>.summary.md` (same directory as the extracted file). Use the `Write` tool.

The prompt template is fully user-editable. Whatever structure it specifies is what you produce — the script does not parse the response.

## Step 2b — Per-chapter sections

When the user asks to "break this into chapter notes", "give me per-section notes", "make per-chapter infographics from this", or similar after Step 1, this is a **three-pass workflow you orchestrate yourself**.

### Pass A — Outline

1. Read `${SKILL_DIR}/prompts/outline.md`.
2. Read the extracted Markdown produced in Step 1 (skip the YAML frontmatter when feeding the model).
3. Apply the outline prompt to the article body. The prompt is engineered to make you emit blocks in this exact format:

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
   - Each `anchor` appears verbatim somewhere in the source MD body (use `grep` / substring match — case-sensitive, exact).
   - Each `brief` is non-empty and is one sentence.
   - Sections are in source order.

   If validation fails, write your raw outline response to `<out>/<domain>/<slug>/_outline-raw.md` for the user, explain the failure, and stop. Do **not** silently retry — the user has likely tuned `outline.md` in a way that broke the markers, and they need to see the raw output.

### Pass B — Per-chapter MDs (parallel-friendly)

Compute filenames first: for the `i`-th section (1-indexed), filename = `NN-<section-slug>.md` where `NN` is zero-padded (`01`, `02`, …) and `<section-slug>` follows the same rule as the article slug (lowercase, alphanumerics joined with `-`, ≤50 chars).

For each section, in parallel where reasonable:

1. Read `${SKILL_DIR}/prompts/section.md`.
2. **Locate the section's content** in the source MD using `ANCHOR` as a hint:
   - Find the line containing `ANCHOR` text.
   - The section's content runs from that line to the line containing the next section's `ANCHOR` (or end of document for the last section).
   - Use this regional focus when applying the prompt — you don't need to byte-exact slice; topical focus on that region is enough.
3. Apply the section prompt with this user-message context:

   ```
   Article: <title>
   Source: <url>
   Section <N> of <M>: <title>
   Brief: <brief>

   Article excerpt:
   <regional content from the source MD>
   ```

4. Write the model's verbatim response to `<out>/<domain>/<slug>/NN-<section-slug>.md`.

### Pass C — Index (deterministic, no LLM)

Write `<out>/<domain>/<slug>/00-index.md` with this exact structure:

```markdown
# <Article Title>

> **Source:** <url>
> **Author:** <author from frontmatter, if any>
> **Published:** <published from frontmatter, if any>
> **Generated:** <YYYY-MM-DD>

---

## Sections

| # | Section | Brief |
|---|---------|-------|
| 01 | [<title>](./01-<slug>.md) | <brief> |
| 02 | [<title>](./02-<slug>.md) | <brief> |
…
```

This is templated string-assembly — no model call needed. Drop the `Author` / `Published` lines if those fields aren't present in the source frontmatter.

## Output

```
url-to-markdown/<domain>/<slug>.md            # Step 1: extracted article
url-to-markdown/<domain>/<slug>.summary.md    # Step 2a: single summary
url-to-markdown/<domain>/<slug>/00-index.md   # Step 2b: index
url-to-markdown/<domain>/<slug>/NN-<section-slug>.md  # Step 2b: per-chapter
```

`<slug>.md` (file) and `<slug>/` (directory) coexist as siblings — no filesystem conflict (a file and a directory at different paths).

YAML frontmatter on the Step 1 extracted MD:

```yaml
---
url: <final URL after redirects>
title: <Readability title>
description: <meta description>
author: <meta or article:author>
published: <meta article:published_time>
captured_at: <ISO 8601>
mode: fetch | chrome | chrome-wait
word_count: <N>
---
```

`<slug>` rule: lowercase, alphanumerics joined with `-`, ≤50 chars (derived from title; falls back to URL path). Conflict resolution: append `-YYYYMMDD-HHMMSS`.

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

Reports Bun version, Node version, prompt presence, and Chrome detection.

## Environment Variables

| Variable | Default / fallback | Description |
|---|---|---|
| `URLMD_DATA_DIR` | `./url-to-markdown` (cwd) | Output root override. |
| `URLMD_CHROME_PATH` | auto-detected per platform | Chrome executable override. |
| `URLMD_CHROME_PROFILE_DIR` | platform user-data root | Chrome profile dir override (separate from `baoyu-url-to-markdown`'s profile so there's no cross-contamination). |

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Tool / argument error (bad URL, missing flag value, invalid mode combination) |
| `2` | Page-side error (best-effort extraction insufficient; e.g., Chrome retry exhausted) |
