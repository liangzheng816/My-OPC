---
name: self-learning-html
description: >
  Transforms any content source — PDF, web URL, YouTube transcript, markdown,
  book chapter, lecture notes, slides, or research paper — into a self-contained
  interactive self-learning HTML site: reading guides, optional multiple-choice
  quizzes, and optional flip-card flashcard decks. Pure HTML/CSS/JS, no server
  or framework needed.

  Use this skill when the user wants to: turn a document or video into a learning
  site or study guide; generate a quiz or flashcard set from source material; build
  an interactive "learn from this" HTML page; make content "quizzable" or
  "flashcard-able"; create an offline-friendly study resource; or convert
  educational material, docs, or course content into HTML.

  Also trigger for: "make this learnable", "turn this into a study guide",
  "I want to quiz myself on this", "create flashcards from this",
  "build a learning page from these notes/links/PDF".
---

# Self-Learning HTML Generator

You transform source material into a polished, self-contained HTML learning site.
The output is always a folder of plain HTML files — no build step, no server, no
framework. Anyone can open `index.html` in a browser and start learning immediately.

## Feature defaults

Before generating anything, confirm which optional features the user wants.
Ask once, clearly, then proceed.

| Feature | Default | Ask? |
|---------|---------|------|
| Reading guides (slide-panel sections) | **Always on** | No |
| Flashcard deck (`flashcards-index.html` + per-guide cards) | **On by default** | Only if user hasn't specified |
| Quiz (`quiz-index.html` + per-guide questions) | **Off by default** | Only if user hasn't specified |

**How to ask** — one short question, before any content work begins:

> "Should I include a quiz (multiple-choice questions), flashcards, or both?
> By default I'll generate flashcards only — let me know if you'd like quizzes too,
> or if you'd prefer neither."

If the user's original request already specifies (e.g. "create flashcards",
"quiz me on this", "both"), skip the question and use what they said.

Adapt the generated file set and the `index.html` Practice Hub based on the answer:

- **Flashcards only (default):** generate `flashcards-index.html` + per-guide
  flashcard sections; omit `quiz-index.html` and per-guide quiz sections; show only
  the Flashcard CTA card in the Practice Hub.
- **Quiz only:** generate `quiz-index.html` + per-guide quiz sections; omit
  `flashcards-index.html` and per-guide flashcard sections; show only the Quiz CTA
  card in the Practice Hub.
- **Both:** generate all files; show both CTA cards in the Practice Hub.
- **Neither:** generate reading guides only (`index.html` + guide pages); omit
  Practice Hub entirely; the index shows only the guide cards.

---

## What you generate

File set depends on features selected (see above). Full set:

```
index.html              ← Library home + Practice Hub (adapts to selected features)
quiz-index.html         ← All questions aggregated (only if quiz enabled)
flashcards-index.html   ← All deduplicated flashcards (only if flashcards enabled)
guide-01-[slug].html    ← Reading guide + optional per-guide quiz + optional flashcards
guide-02-[slug].html    ← (one file per topic cluster)
...
```

---

## Generation workflow — follow in strict order

### STEP 1 — CONFIRM FEATURES
Ask the feature question (above) if the user hasn't already specified. Record:
- `quiz_enabled`: true / false  (default: false)
- `flashcards_enabled`: true / false  (default: true)

### STEP 2 — INGEST
Read all upstream source material completely before extracting anything.
- PDF → extract all text, preserve headings and callout boxes
- Web URL → fetch full page, strip nav/footer chrome
- YouTube transcript → group by topic shifts
- Markdown/slides → headings = sections, slide titles = concept terms
- Multiple sources → merge into unified concept list; note cross-source concepts

### STEP 3 — EXTRACT CONCEPTS
Build a flat concept list. For each concept record:
- `term` — 1–6 words; this is the flashcard front and quiz subject
- `definition` — 1–3 sentences, plain language, no unexplained jargon
- `explanation` — 2–6 sentences of "why it matters" and mechanics; used in guide body
- `guide_refs` — which guide(s) cover this (e.g. `["g1", "g3"]`)
- `level` — `foundation` / `applied` / `advanced`
- `misconception` — (optional) the most common wrong mental model
- `example` — (optional) a concrete worked example

Target concept counts: ~10–15 for a short article/video, ~15–25 for a book chapter,
~25–40 per guide for deep technical material.

**Deduplication rule:** If the same concept appears in multiple guides, keep ONE
flashcard with ALL guide tags. Never create duplicate cards.

→ For full extraction rules and quality checklist, read `references/content-schema.md`

### STEP 4 — STRUCTURE GUIDES
Group concepts into 2–4 guides (sections). Assign each guide:
- `id` — g1, g2, g3, …
- `level_label` — "01 · Foundations" / "02 · Applied" / "03 · Advanced"
- `color` — slate / amber / accent (see design system)
- `title` + `subtitle` + `description` — used on index card
- `filename` — e.g. `guide-01-foundations.html`

Always structure in learning order: Foundations → Applied → Advanced (or equivalent).

### STEP 5 — WRITE QUIZ QUESTIONS  *(skip if quiz_enabled = false)*
Write 6–12 questions per guide. Each question needs:
- 4 options (A/B/C/D), exactly one marked `data-correct="true"`
- An `explanation` (1–2 sentences shown after answering)
- Distribute across 4 types: definition recall / mechanic / compare-and-contrast /
  misconception-busting (~30% / 40% / 15% / 15%)

### STEP 6 — WRITE FLASHCARD DEFINITIONS  *(skip if flashcards_enabled = false)*
Write definitions for all deduplicated concepts (≤40 words each).
Sort alphabetically. Assign guide tags (multi-tag merged concepts).

### STEP 7 — GENERATE HTML FILES
Build files based on enabled features. Generate in this order:
guide pages → quiz-index.html (if enabled) → flashcards-index.html (if enabled)
→ index.html last (it references final counts and links).

**Mandatory: Slide Panel display for guide content sections.**
Every content `<section id="...">` in a guide page MUST render as a slide panel —
a card with a colored header bar and auto-numbered slide chip. Include the Slide
Panels CSS block (from `references/design-system.md`) in every guide page's
`<style>` tag. Set `--guide-color` in `:root` to the guide's accent color. Never
skip this — plain `<h2>` headings without slide panel treatment are not acceptable.

→ For exact HTML structure of each file type, read `references/page-schemas.md`
→ For the design system (CSS variables, typography, colors, slide panels), read `references/design-system.md`
→ For JS patterns (quiz state machine, flip/shuffle/filter), read `references/code-patterns.md`

### STEP 8 — VERIFY
Before declaring done, check:
- [ ] File set matches the features that were enabled
- [ ] `index.html` Practice Hub shows only the CTAs for enabled features
- [ ] Stats strip counts in `index.html` are accurate (omit quiz count if no quiz, etc.)
- [ ] Guide pages include per-guide quiz section only if `quiz_enabled = true`
- [ ] Guide pages include per-guide flashcard section only if `flashcards_enabled = true`
- [ ] Each quiz question has `data-correct="true"` on exactly one option (if quiz enabled)
- [ ] No duplicate terms in `flashcards-index.html` (if flashcards enabled)
- [ ] All internal `href` links resolve to files that were actually generated

---

## Design principles

- **Plain language first.** Lead with what a thing *does*, then what it *is*.
- **No filler.** Never: "It's important to note…", "In conclusion…"
- **Active voice.** "The agent decides" not "A decision is made."
- **Insight boxes** (`.insight`) for key takeaways; **Misconception boxes**
  (`.misconception`) for common wrong assumptions — use both in guide bodies.
- When both features are on, the **Practice Hub** (quiz + flashcard CTAs) is the
  primary hero of `index.html`. When only one feature is on, show that one CTA
  prominently. When neither is on, lead with the guide cards directly.
