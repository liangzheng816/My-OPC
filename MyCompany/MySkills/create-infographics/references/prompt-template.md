# Prompt Template — The Canonical Skeleton

Use this as the starting point for every infographic prompt. Fill in the bracketed placeholders.

The template has **5 mandatory blocks**, in this exact order:

1. **Critical rules block** (must be at the top — Gemini weights top-of-prompt instructions most strongly)
2. **Layout description** (where the zones go)
3. **Content for each zone** (the actual data)
4. **Visual style block** (palette + typography + don'ts)
5. **Final reminder** (re-affirms structure rules)

---

## The Skeleton

```text
Create a [ASPECT RATIO] [LAYOUT TYPE] infographic slide — modern enterprise AI / SaaS keynote style.
Polished pitch-deck visual, clean typography, crisp text legibility.

## CRITICAL — STRUCTURE RULES

- The slide has EXACTLY [N] zones, in this order: [LIST THEM]
- [SECTION] count: EXACTLY [N], in this order: [01, 02, 03, ...]
- DO NOT duplicate any [section / card / pillar / half]
- DO NOT skip any [section / card / pillar / half]
- DO NOT add additional zones beyond what's listed
- If unsure about space, REDUCE detail in each section rather than duplicate or omit

## Layout

[Describe each zone top-to-bottom, with exact dimensions / positions where it matters]

### Zone 1 — Top header strip

- Master title (large, bold, dark slate #0F172A): "[TITLE]"
- Subtitle (medium, slate #475569): "[SUBTITLE]"
- Tiny attribution (#94A3B8): "[SOURCE · DATE · AUTHOR]"

### Zone 2 — Hero / thesis band (full-width card, light blue wash #EFF6FF)

[ONE single bold statement, in dark slate, centered]

Attribution beneath in slate italic: "[ATTRIBUTION IF QUOTE]"

### Zone 3 — Main content

[Layout-specific. See examples below.]

### Zone 4 — Bottom takeaway banner (full-width, dark slate #0F172A background, white text)

[Strong single-line takeaway in white]

Below it, smaller muted-white text: "[ATTRIBUTION / SOURCES]"

## Visual style — modern enterprise AI / SaaS keynote

- White (#FFFFFF) background; very light slate (#F8FAFC) for soft card backgrounds
- Clean modern sans-serif typography (Inter / Helvetica / SF Pro feel)
- Generous whitespace; rounded cards (8-12px radius); subtle drop-shadows; thin 1px #E2E8F0 borders
- Section numbered badges: small circular blue (#2563EB) badges with white digits, one per section
- Simple line icons only — no clipart, no mascots, no cartoon characters

## Strict palette (nothing else)

- Background: white #FFFFFF / off-white #FAFAFA / soft slate #F8FAFC
- Primary text: #0F172A
- Secondary text: #475569
- Muted text: #94A3B8
- Card border: #E2E8F0
- Primary accent (future / positive / interactive): #2563EB (enterprise blue)
- Burden / transition / current-state accent: #F97316 (warm orange)
- Optional neutral data accent: #0EA5E9 (muted teal)
- Soft washes: #EFF6FF (blue), #FFF7ED (orange)
- Dark slate banner: #0F172A

## Don'ts

- DO NOT duplicate or repeat any numbered section / card / pillar — exact counts above are mandatory
- No dark backgrounds (except the bottom takeaway banner)
- No gradients on cards (only transformation arrows may use orange→blue gradient)
- No glossy effects, no photorealism, no 3D shadows
- No hand-drawn / chalk / sketch / marker aesthetic
- No rainbow palettes — strictly blue + orange + neutrals (+ optional teal)
- No stock-clipart mascots, no oversized cartoon icons

## Final reminder

The slide has EXACTLY [N] [zones / sections / cards], in this order: [LIST AGAIN]. No duplicates, no omissions, no additions.
```

---

## Filling in the Layout-Specific Main Content

The "Zone 3 — Main content" block varies by layout. Here are the standard fills:

### A. 4-Stage Maturity Arc (16:9 landscape)

```text
Use four horizontally arranged maturity stages:

1. Current deterministic / manual state — [SPECIFICS]
2. Human operational burden — [SPECIFICS]
3. Intent-driven AI state — [SPECIFICS]
4. Autonomous execution loop — [SPECIFICS]

Each stage:
- Numbered circular badge (1 / 2 / 3 / 4) at top
- Short heading (2-4 words, bold)
- Simple line icon
- 1-2 short bullets (~10 words max each)
- One micro-metric

Thin gray arrows between 1→2 and 3→4 in #94A3B8.
The 2→3 arrow uses an orange→blue gradient to mark the transformation moment.

Stages 1 and 2: warm orange (#F97316) for badges, headings, accents.
Stages 3 and 4: enterprise blue (#2563EB) for badges, headings, accents.
Stage 1 background: very light orange wash (#FFF7ED).
Stage 2 background: slightly deeper orange wash.
Stage 3 background: very light blue wash (#EFF6FF).
Stage 4 background: slightly deeper blue wash.
```

### B. 6-Section Dense-Modules Poster (9:16 portrait)

```text
Six numbered sections stacked vertically, in this exact order:
- SECTION 01 — [TITLE] — [DESCRIPTION]
- SECTION 02 — [TITLE] — [DESCRIPTION]
- SECTION 03 — [TITLE] — [DESCRIPTION]
- SECTION 04 — [TITLE] — [DESCRIPTION]
- SECTION 05 — [TITLE] — [DESCRIPTION]
- SECTION 06 — [TITLE] — [DESCRIPTION]

Each section:
- Small circular blue (#2563EB) badge with white digit (01-06)
- Section header (bold dark slate)
- Content varies — comparison cards, lists, mini-diagrams, equations, quotes

CRITICAL: Each badge appears EXACTLY ONCE. The sequence is 01 → 02 → 03 → 04 → 05 → 06. No duplicates, no skipped numbers, no section 07.

Thin slate (#E2E8F0) divider line between sections, OR generous vertical whitespace.
```

### C. Binary Comparison (16:9 landscape)

```text
TWO equal-width card halves side-by-side, with ONE transformation arrow between:

LEFT HALF — [OLD TITLE] (orange #F97316 accent on top edge, light orange wash #FFF7ED)
- Header: "[OLD LABEL]"
- Bullets: [6 bullets describing the old state]
- Simple line icon

TRANSFORMATION ARROW (between the two halves)
- Big arrow pointing LEFT → RIGHT
- Label on arrow: "[TRANSFORMATION CAUSE]"
- Orange → blue gradient (the only gradient in the slide)

RIGHT HALF — [NEW TITLE] (blue #2563EB accent on top edge, light blue wash #EFF6FF)
- Header: "[NEW LABEL]"
- Bullets: [6 bullets describing the new state]
- Simple line icon

CRITICAL: Exactly ONE left half, ONE right half, ONE transformation arrow. No duplicates.
```

### D. 3-Card Horizontal (16:9 landscape)

```text
Hero band with [equation / thesis] full-width.

THREE pillar cards horizontally (equal width, no duplicates):

Card 1 of 3 — [TITLE] ([ACCENT])
- Subtitle: [SHORT TAGLINE]
- Body: [1-2 LINES]
- Tag pill or icon

Card 2 of 3 — [TITLE] ([ACCENT])
- Subtitle: [SHORT TAGLINE]
- Body: [1-2 LINES]
- Tag pill or icon

Card 3 of 3 — [TITLE] ([ACCENT])
- Subtitle: [SHORT TAGLINE]
- Body: [1-2 LINES]
- Tag pill or icon

CRITICAL: Exactly 3 cards. Card 1 of 3, Card 2 of 3, Card 3 of 3. No duplicates.
```

---

## Tone & Voice Rules

When writing prompt copy that Gemini will render as visible text:

- **Master titles**: declarative, 3-7 words, no hedging
- **Subtitles**: one sentence, complete
- **Section headers**: 2-4 words, often nouns
- **Bullets**: 6-12 words, parallel grammar across siblings
- **Bottom takeaway**: one sentence, action-oriented when possible
- **Quotes**: short (under 20 words), with author/source attribution

Avoid:
- Marketing fluff ("revolutionary", "game-changing")
- Hashtags (they render as visible text)
- Long paragraph fragments (Gemini may truncate or garble)
- Special characters that may render oddly (`×`, `→`, em dashes) — spell out or use simpler punctuation when reliability matters

---

## Aspect Ratio Defaults Per Use Case

| Use case | Aspect | Notes |
| --- | --- | --- |
| Standard section infographic | 16:9 | The default for most needs |
| Whole-talk summary poster | 9:16 | Use 6-section dense-modules layout, never 7+ |
| Dense data poster | 3:4 | Use dense-modules with 6-7 tight modules |
| Social-media share | 1:1 | 3-4 cards or single hero stat |
| Pitch deck slide | 16:9 | Default; pair with one of the layouts above |

For 9:16 and 3:4, **always cap section count at 6** to avoid the duplicated-badge bug.

---

## Quick Start

The fastest way to a working infographic:

1. Pick aspect ratio (16:9 default, 9:16 only for whole-content summaries)
2. Pick layout (4-stage / binary / 3-card / 6-section poster)
3. Copy the skeleton above + the layout-specific Zone 3 fill
4. Fill in the bracketed placeholders with the content
5. Save as `prompt.md`
6. Run via the batch.json shape in the parent SKILL.md
