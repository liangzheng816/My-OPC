# Layout Cookbook

Which layout to pick based on the content shape. Quick reference; copy-paste the corresponding template from [prompt-template.md](prompt-template.md).

---

## Decision Tree (Quick)

```
Does the content have a CURRENT → FUTURE transformation arc?
│
├── YES (with 4 distinct stages)
│   └── A. 4-Stage Maturity Arc (16:9 landscape)
│
└── NO
    │
    ├── A vs B comparison?
    │   └── B. Binary Comparison (16:9 landscape)
    │
    ├── 3-7 parallel themes?
    │   └── C. 3-7 Card Horizontal (16:9 landscape)
    │
    ├── Whole-content summary (talk, paper, book)?
    │   └── D. 6-Section Dense-Modules Poster (9:16 portrait)
    │
    ├── Single hero stat + supporting data?
    │   └── E. Hero Stat + Supporting Band (16:9 landscape)
    │
    ├── High-density infopedia (8+ modules)?
    │   └── F. Dense-Modules Poster (3:4 portrait)
    │
    └── 4 categorically different stories (not sequential)?
        └── G. 2×2 Grid (16:9 landscape)
```

---

## A. 4-Stage Maturity Arc (16:9 landscape)

**Use when:** content describes a transformation from a current/painful state to a future/positive state through 4 distinct progressions.

**Examples:**

- Industry-shift narratives (deterministic → burden → intent-driven → autonomous)
- Sliding scales (tab autocomplete → agentic dev → background async → dark factories)
- Capability evolution (pre-AI → ChatGPT → o1 reasoning → long-horizon agents)

**Layout:**

- Top header strip
- Hero band (one-sentence thesis or attribution)
- 4 cards horizontally with: numbered badge, heading, simple icon, 1-2 bullets, micro-metric
- Thin gray arrows 1→2 and 3→4
- **Orange→blue gradient arrow** 2→3 (the transformation moment)
- Stages 1-2 in orange `#F97316` (current pain)
- Stages 3-4 in blue `#2563EB` (future positive)
- Bottom takeaway banner

**Strategic takeaway banner format:** *"Build [FUTURE METAPHOR], not [OLD METAPHOR]. Product builders must transition toward [NEW DESIGN PRINCIPLE]."*

**Best for:** executive decks, strategy slides, "the case for X" arguments.

---

## B. Binary Comparison (16:9 landscape)

**Use when:** content is an A vs B argument, before vs after, old vs new.

**Examples:**

- Old triangle org vs new AI-native circle org
- 67% organizational vs 32% individual (AI impact drivers)
- Adoption vs absorption (work trend index)

**Layout:**

- Top header strip
- 2 large equal-width card halves side-by-side
  - LEFT in orange `#F97316` accent, light orange wash `#FFF7ED` background
  - RIGHT in blue `#2563EB` accent, light blue wash `#EFF6FF` background
- **ONE** transformation arrow between (orange→blue gradient)
- Lower band with shared takeaway or "what doesn't change"
- Bottom banner

**Critical:** explicitly state "exactly ONE left half, ONE right half, ONE arrow."

**Best for:** competitive positioning, before/after stories, strategic pivots.

---

## C. 3-7 Card Horizontal (16:9 landscape)

**Use when:** content has 3-7 parallel themes / pillars / steps that don't form a transformation arc.

**Examples:**

- Talent formula 3 pillars (capability / taste / agency)
- 5 application domains (code assistants / GUI / embodied / scientific / personalization)
- 5 leadership levers (model AI use / set standards / safety / reward / govern)

**Layout:**

- Top header strip
- Hero band (thesis or master equation)
- N cards horizontally (equal width, aligned baselines)
- Each card: numbered circular badge, heading, icon, 1-3 bullets, optional tag pill
- Lower band optional (synthesis or "common pattern")
- Bottom banner

**Color rules:**

- **3 cards, no semantic split:** all blue badges
- **3 cards, with semantic split:** blue + orange + optional teal
- **5-7 cards:** all blue badges to avoid rainbow

**Critical:** use "Card 1 of N" phrasing throughout.

**Best for:** parallel-feature comparisons, pillar frameworks, multi-domain overviews.

---

## D. 6-Section Dense-Modules Poster (9:16 portrait)

**Use when:** summarizing a whole talk, paper, or book into one tall scrollable image.

**Examples:**

- Whole 60-min interview summary
- Survey paper TL;DR with abstract + key findings
- Quarterly report executive summary

**Layout:**

- Master title block + subtitle + attribution (top ~10%)
- Hero thesis band (full-width quote card, light blue wash)
- **EXACTLY 6 numbered sections**, stacked vertically:
  - 01, 02, 03, 04, 05, 06 — each badge appears once, sequence in order
  - Each section: blue circular badge + bold header + distinct visual treatment
  - Mix of mini-comparisons, lists, equations, quote blocks within sections
- Bottom takeaway banner (full-width dark slate)

**Critical:** **maximum 6 sections at 9:16.** More → duplication. See [anti-duplication.md](anti-duplication.md).

**Best for:** social-media-shareable long-image, executive whole-talk briefing, "what to know about this paper" posters.

---

## E. Hero Stat + Supporting Band (16:9 landscape)

**Use when:** content centers on one big number that needs amplification.

**Examples:**

- 49% Copilot intent mix (1 hero number, 3 supporting KPIs)
- 67/32 organizational vs individual AI impact
- $10T services-plus-software opportunity

**Layout:**

- Top header strip
- **Hero card** (full-width or large card) with the headline number rendered very large
- Supporting band: 3-4 smaller cards with secondary data points
- Bottom banner with action line

**Best for:** stat-heavy slides, market-size visualizations, "the one number you need to know."

---

## F. Dense-Modules Infopedia Poster (3:4 portrait)

**Use when:** content is data-rich and you want max info density (e.g., for a printed reference or detailed report card).

**Examples:**

- Multi-section research paper poster
- Comprehensive market-mapping document
- Detailed product specification visualization

**Layout:**

- Top header strip (compact)
- 6-7 coordinate-labeled modules (MOD-1 through MOD-7) packed in an asymmetric grid
- Each module: small coordinate label + tight title + dense content (tables, mini-charts, lists)
- Footer strip with source attribution

**Style:** can use executive-saas, but also works well with `chalkboard` (educational), `aged-academia` (research paper), `pop-laboratory` (technical precision), or `morandi-journal` (warm hand-drawn).

**Critical:** even with 7 modules, watch for duplication. Tight content per module.

**Best for:** infopedia-style high-density posters, executive briefings that need printing.

---

## G. 2×2 Grid (16:9 landscape)

**Use when:** content has 4 parallel themes / quadrants that aren't sequential.

**Examples:**

- Four Modes of AI Work (asking / collaboration / delegation / exploration)
- Capability × Readiness quadrant (Frontier / Emergent / Blocked / Stalled)
- The four stories framework (Aluminum / Alien Design / Emerging Sciences / Art of Unreason)

**Layout:**

- Top header strip
- Optional hero band with framing
- 2×2 grid of equal-sized cards (each ~quadrant)
- Each card: small badge, heading, icon, 1-3 bullets, optional micro-stat
- Bottom banner

**Color rules:**

- If quadrants have semantic meaning (e.g., burden vs future): mix orange and blue
- Otherwise: all blue badges

**Critical:** "exactly 4 quadrant cards: Card 1, Card 2, Card 3, Card 4 — no duplicates."

**Best for:** matrix frameworks, quadrant analyses, parallel-story sets.

---

## Layout × Style Compatibility

The 8 layouts above are **layout** decisions. The visual **style** is independently chosen (default: `executive-saas`). Most combinations work, but some pair more naturally:

| Layout | Best style | Alternative styles |
| --- | --- | --- |
| 4-Stage Maturity Arc | `executive-saas` | `corporate-memphis` |
| Binary Comparison | `executive-saas` | `corporate-memphis`, `bold-graphic` |
| 3-7 Card Horizontal | `executive-saas` | `corporate-memphis`, `morandi-journal` |
| 6-Section Dense-Modules Poster | `executive-saas` | `chalkboard`, `aged-academia`, `pop-laboratory`, `morandi-journal` |
| Hero Stat + Supporting Band | `executive-saas` | `chalkboard` |
| Dense-Modules Infopedia | `chalkboard` / `aged-academia` / `pop-laboratory` / `morandi-journal` | `executive-saas` |
| 2×2 Grid | `executive-saas` | `craft-handmade`, `corporate-memphis` |

For full style descriptions, see [`deps/baoyu-infographic/references/styles/`](../deps/baoyu-infographic/references/styles/).

---

## Picking Aspect Ratio

| Aspect | When |
| --- | --- |
| **16:9 landscape** (default) | Section infographics, deck slides, single-topic depth |
| **9:16 portrait** | Whole-talk summary posters (max 6 sections) |
| **3:4 portrait** | Dense-modules infopedia posters (max 7 modules) |
| **1:1 square** | Social-media share images (max 4 cards) |

---

## Common Mistakes to Avoid

1. **Trying to fit 8+ sections into 9:16** → use 16:9 with a 4×2 grid, or split into 2 images
2. **All-blue cards in a binary comparison** → use orange + blue to signal old vs new
3. **Forgetting the bottom takeaway banner** → every infographic needs a synthesis line
4. **Letting the hero band exceed 2 sentences** → keep it to one bold statement
5. **Using rainbow colors for 5+ cards** → all blue (or all your accent of choice) for visual coherence
