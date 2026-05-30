# Content Schema Reference

## Source Type Handling

| Source | What to do |
|--------|-----------|
| PDF | Extract all text; note section headers, figures, callout boxes, tables |
| Web URL | Fetch full page; strip nav/footer chrome; preserve headings and body |
| YouTube transcript | Group by topic shifts / speaker pauses into logical segments |
| Markdown / plain text | Headings = sections; code blocks, bold terms = concept candidates |
| Slides / PPTX | Slide title = term; body = definition + explanation |
| Audio / podcast | Transcribe first (Whisper or manual), then treat as transcript |
| Research paper | Abstract + section headers + conclusion = concept skeleton |
| Code repo | README, inline comments, docstrings = source text |
| Multiple sources | Merge into unified concept list; flag cross-source concepts for multi-tag |

---

## Concept Record Schema

Each concept is the atomic learning unit. Extract one record per concept.

```
term          Short name, 1–6 words. Flashcard front + quiz subject.
definition    1–3 sentences. Plain language. No jargon without explanation.
              This goes on the flashcard back. ≤40 words.
explanation   2–6 sentences. Why it matters + mechanics.
              Used in reading guide body paragraphs.
guide_refs    List of guide IDs covering this concept, e.g. ["g1", "g3"].
              Multi-ref concepts get multi-tag treatment on flashcards.
level         "foundation" | "applied" | "advanced"
misconception (optional) The most common wrong mental model about this concept.
              Used in .misconception boxes in the guide.
example       (optional) A concrete worked example or analogy.
```

### Target concept counts

| Source size | Concepts per guide |
|------------|-------------------|
| Short article / 1-hr video | 10–15 |
| Book chapter / long article | 15–25 |
| Full course / deep technical spec | 25–40 |

### Deduplication rule
If the same concept appears across multiple guides:
- Keep ONE flashcard entry
- Set `guide_refs` to all relevant guide IDs
- Merge the best-of definitions from each guide
- Never create two cards with the same term

---

## Guide Structure Schema

Group concepts into 2–4 guides. Always structure in learning order.

```
id            "g1", "g2", "g3", … (sequential)
level_label   "01 · Foundations" | "02 · Applied" | "03 · Advanced"
              (adapt labels to the domain — e.g. "01 · Core Concepts" is fine)
color         "slate" | "amber" | "accent"  (g1=slate, g2=amber, g3=accent)
title         Short title for the guide card, e.g. "How an Agent Actually Runs"
subtitle      Italic explanatory phrase shown below the title
description   2–3 sentence summary shown on the index card
concepts      List of concept IDs belonging to this guide
tags          5–8 keyword chips shown on the index card
              Include quiz/flashcard count at the end, e.g. "10 questions · 20 cards"
filename      "guide-01-foundations.html" etc.
```

**Progression rule:** Each guide must be self-contained but reference the others.
The reading order is always Foundations → Applied → Advanced.

---

## Content Writing Rules

### Tone
- Plain, direct. Write like explaining to a smart colleague who hasn't seen this.
- Active voice. "The model decides" not "A decision is made by the model."
- Concrete before abstract. What does it *do* before what it *is*.
- No filler: never "It's important to note…", "In conclusion…", "As we can see…"

### Reading guide section order (per concept cluster)
1. One-sentence plain definition
2. Why it exists / what problem it solves
3. How it works (mechanics)
4. `.insight` box — key takeaway in 1–2 sentences
5. `.misconception` box — the most common wrong mental model (if one exists)
6. Concrete example or analogy (preferred)

### Quiz question types — distribute across all four

| Type | Pattern |
|------|---------|
| Definition recall | "What is X?" / "Which best describes X?" |
| Mechanic | "What happens when X occurs?" |
| Compare | "What is the difference between X and Y?" |
| Misconception bust | "Which statement about X is FALSE?" |

Difficulty spread: ~30% easy recall, ~40% applied understanding, ~30% nuanced/tricky.

**Distractor rules (wrong answers):**
- Use related-but-wrong terminology from the same domain
- Never use obviously silly distractors
- One distractor should be the most common misconception
- Vary correct answer position — don't always put it in slot B

### Flashcard definition quality checklist
- [ ] ≤40 words
- [ ] Contains "what it does" not just "what it is"
- [ ] No undefined acronyms
- [ ] Makes sense without having read the guide
- [ ] Does not repeat the term verbatim in the definition

---

## Naming Conventions

| Element | Convention |
|---------|-----------|
| Guide filenames | `guide-01-{slug}.html`, `guide-02-{slug}.html` |
| Quiz question IDs | `q{guideN}_{questionN}` — e.g. `q1_3`, `q2_7` |
| Flashcard `data-g` | `g1`, `g2`, `g3`, … |
| Section anchor IDs | lowercase-kebab of section title |
| Guide color CSS vars | `--g1`, `--g2`, `--g3` (added to `:root` in multi-guide files) |
