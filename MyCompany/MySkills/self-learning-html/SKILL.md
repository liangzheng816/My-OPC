---
name: self-learning-html
description: >
  Transforms any content source — PDF, web URL, YouTube transcript, Office doc,
  audio recording, markdown, book chapter, lecture notes, slides, or research paper —
  into a self-contained interactive self-learning HTML site: reading guides,
  multiple-choice quizzes, and flip-card flashcard decks. Pure HTML/CSS/JS, no
  server or framework needed. Auto-delegates to /url-to-markdown, /pdf-to-markdown,
  /office-to-markdown, /audio-to-markdown, or /youtube-to-markdown for non-markdown
  inputs, then generates the site from the resulting markdown.

  Use this skill when the user wants to: turn a document or video into a learning
  site or study guide; generate a quiz or flashcard set from source material; build
  an interactive "learn from this" HTML page; make content "quizzable" or
  "flashcard-able"; create an offline-friendly study resource; or convert
  educational material, docs, or course content into HTML.

  Also trigger for: "make this learnable", "turn this into a study guide",
  "I want to quiz myself on this", "create flashcards from this",
  "build a learning page from these notes/links/PDF".
allowed-tools: Read, Write, Glob, WebFetch, Skill, Bash
---

# Self-Learning HTML Generator

You transform source material into a polished, self-contained HTML learning site.
The output is always a folder of plain HTML files — no build step, no server, no
framework. Anyone can open `index.html` in a browser and start learning immediately.

## Reference Directory

**Important**: All design / schema / code references live in the `references/`
subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`.
2. Reference paths in this document use `${SKILL_DIR}/references/<file>.md`.
3. Replace all `${SKILL_DIR}` tokens with the actual path before reading.

**Reference files**:

| File | Purpose |
|------|---------|
| `${SKILL_DIR}/references/content-schema.md` | Concept extraction rules, source handling, deduplication, quality checklist. |
| `${SKILL_DIR}/references/page-schemas.md`   | Exact HTML structure for `index.html`, guide pages, `quiz-index.html`, `flashcards-index.html`. |
| `${SKILL_DIR}/references/design-system.md`  | CSS variables, typography, color palette (g1/g2/g3), layout, spacing, component styles. |
| `${SKILL_DIR}/references/code-patterns.md`  | JS patterns: quiz state machine, flashcard flip/shuffle/filter, scoring, persistence. |

## What you generate

Every site has this structure:

```
index.html              ← Library home + Practice Hub (quiz & flashcard CTAs)
quiz-index.html         ← All questions from all guides aggregated in one place
flashcards-index.html   ← All deduplicated flashcards in a flat, filterable grid
guide-01-[slug].html    ← Reading guide + per-guide quiz + per-guide flashcards
guide-02-[slug].html    ← (one file per topic cluster)
...
```

## Generation workflow — follow in strict order

### STEP 0 — INPUT ROUTING

Detect the input type and convert non-markdown sources to markdown first by
invoking the appropriate sibling skill via the `Skill` tool. Use the resulting
`.md` file (or merged markdown if multiple) as the source for STEP 1.

| Input shape | Action |
|---|---|
| URL on `youtube.com` / `youtu.be` / `youtube.com/shorts` | Invoke `/youtube-to-markdown <url>` |
| Any other `https://...` URL | Invoke `/url-to-markdown <url>` |
| Path ending in `.pdf` | Invoke `/pdf-to-markdown <path>` |
| Path ending in `.docx`, `.pptx`, `.xlsx`, `.csv` | Invoke `/office-to-markdown <path>` |
| Path ending in `.mp3`, `.wav`, `.m4a` | Invoke `/audio-to-markdown <path>` |
| Path ending in `.md` or `.markdown` | Use directly — skip to STEP 1 |
| Inline markdown pasted in chat | Use directly — skip to STEP 1 |
| Multiple mixed sources | Run the matching converter on each, then merge in STEP 1 |

If a converter exits with a non-zero code or produces an empty/insufficient
markdown file, stop and surface the error — do not silently fall back to
generating a site from a broken input.

### STEP 1 — INGEST

Read all upstream markdown completely before extracting anything.

- PDF-derived markdown → preserve headings and callout boxes from the conversion.
- URL-derived markdown → the converter already stripped nav/footer chrome.
- YouTube transcript markdown → group by topic shifts (transcripts are usually flat).
- Office-derived markdown → headings, slide titles, sheet names are concept anchors.
- Audio-transcript markdown → group by topic shifts; speaker turns aren't always meaningful.
- Multiple sources → merge into a unified concept list; note cross-source concepts.

### STEP 2 — EXTRACT CONCEPTS

Build a flat concept list. For each concept record:

- `term` — 1–6 words; this is the flashcard front and quiz subject
- `definition` — 1–3 sentences, plain language, no unexplained jargon
- `explanation` — 2–6 sentences of "why it matters" and mechanics; used in guide body
- `guide_refs` — which guide(s) cover this (e.g. `["g1", "g3"]`)
- `level` — `foundation` / `applied` / `advanced`
- `misconception` — *(optional)* the most common wrong mental model
- `example` — *(optional)* a concrete worked example

Target concept counts: ~10–15 for a short article/video, ~15–25 for a book chapter,
~25–40 per guide for deep technical material.

**Deduplication rule:** If the same concept appears in multiple guides, keep ONE
flashcard with ALL guide tags. Never create duplicate cards.

→ For full extraction rules and quality checklist, read `${SKILL_DIR}/references/content-schema.md`

### STEP 3 — STRUCTURE GUIDES

Group concepts into 2–4 guides (sections). Assign each guide:

- `id` — `g1`, `g2`, `g3`, …
- `level_label` — `"01 · Foundations"` / `"02 · Applied"` / `"03 · Advanced"`
- `color` — `slate` / `amber` / `accent` (see design system; extend palette if > 3 guides)
- `title` + `subtitle` + `description` — used on index card
- `filename` — e.g. `guide-01-foundations.html`

Always structure in learning order: Foundations → Applied → Advanced (or equivalent).

### STEP 4 — WRITE QUIZ QUESTIONS

Write 6–12 questions per guide. Each question needs:

- 4 options (A/B/C/D), exactly one marked `data-correct="true"`
- An `explanation` (1–2 sentences shown after answering)
- Distribute across 4 types: definition recall / mechanic / compare-and-contrast /
  misconception-busting (~30% / 40% / 15% / 15%)

### STEP 5 — WRITE FLASHCARD DEFINITIONS

Write definitions for all deduplicated concepts (≤40 words each).
Sort alphabetically. Assign guide tags (multi-tag merged concepts).

### STEP 6 — GENERATE HTML FILES

Build all files using the patterns in the references folder. Generate in this order:
guide pages → `quiz-index.html` → `flashcards-index.html` → `index.html` (last,
because it shows final counts).

→ For exact HTML structure of each file type, read `${SKILL_DIR}/references/page-schemas.md`
→ For the design system (CSS variables, typography, colors), read `${SKILL_DIR}/references/design-system.md`
→ For JS patterns (quiz state machine, flip/shuffle/filter), read `${SKILL_DIR}/references/code-patterns.md`

### STEP 7 — VERIFY

Before declaring done, check:

- [ ] All `href` links between files use correct relative filenames
- [ ] Each quiz question has `data-correct="true"` on exactly one option
- [ ] Quiz `checkQ()` call IDs match the `<div id="...">` of each question
- [ ] No duplicate terms in `flashcards-index.html`
- [ ] Guide counts in `index.html` stats strip match actual file counts
- [ ] Filter tab counts on `flashcards-index.html` are accurate

## Design principles

- **Plain language first.** Lead with what a thing *does*, then what it *is*.
- **No filler.** Never: "It's important to note…", "In conclusion…"
- **Active voice.** "The agent decides" not "A decision is made."
- **Insight boxes** (`.insight`) for key takeaways; **Misconception boxes**
  (`.misconception`) for common wrong assumptions — use both in guide bodies.
- The **Practice Hub** (quiz + flashcard CTAs) is the primary hero of `index.html`;
  reading guides are secondary. Make quizzing and drilling the first thing users see.

## Output

By default, write all files to `./self-learning-html/<slug>/` where `<slug>` is
derived from the source title (lowercase, alphanumerics joined with `-`, ≤50 chars).
If the user specifies an output directory, use that instead.

Open the generated `index.html` for the user once the verify checklist passes.
