# Anti-Duplication Rules

Gemini's image generation has known failure modes in dense vertical layouts — most notably **duplicating section badges** (e.g., generating two "04" sections in an 8-section poster). These rules emerged from production failures and have been tested to actually prevent the problem.

**Apply all of these in every prompt.** None are optional.

---

## Rule 1 — Cap Section Count by Aspect Ratio

| Aspect | Max sections | Why |
| --- | --- | --- |
| 16:9 landscape | 5-7 cards | Gemini handles horizontal grids well |
| **9:16 portrait** | **6 maximum** | **More than 6 → ~30-40% duplicate-badge rate** |
| 3:4 portrait | 6-7 modules | Similar to 9:16 but with more horizontal width |
| 1:1 square | 4 cards | Limited by typography size |

**If your content has 8+ themes**, do one of:

- **Consolidate** related themes into combined sections (preferred — better narrative anyway)
- **Split into 2 images** (one for sections 1-4, one for 5-8)
- **Switch to landscape** with a 4×2 or 5×2 grid

Don't try to fit 8 sections into a 9:16 poster. It fails.

---

## Rule 2 — Put Critical Rules at the Top of the Prompt

Gemini weights instructions earlier in the prompt more heavily. **The duplication-prevention block must be in the first 200 words.**

Standard top-of-prompt block:

```text
## CRITICAL — STRUCTURE RULES

- The slide has EXACTLY [N] numbered sections, in this order: 01, 02, 03, ...
- DO NOT duplicate any section number. Each badge appears exactly once.
- DO NOT skip any section number. The sequence must be complete.
- DO NOT add additional sections beyond what's listed.
- Each section has a distinct title and distinct visual treatment, listed below.
- After the bottom takeaway banner, NO additional sections, NO repeated content.
- If unsure about layout space, REDUCE detail in each section rather than duplicate or omit one.
```

Putting these rules **at the bottom** of the prompt does not work reliably. They must be near the top.

---

## Rule 3 — Number Sections / Cards / Pillars Explicitly

Don't just say "three cards" — say "**exactly 3 cards: Card 1 of 3, Card 2 of 3, Card 3 of 3**".

Don't just say "two halves" — say "**exactly ONE left half, ONE right half, ONE transformation arrow**".

This explicit numbering forces Gemini to allocate space for the exact count and reduces hallucinated duplicates.

### Examples that work

✅ "Three pillar cards: **Card 1 of 3 — CAPABILITY**, **Card 2 of 3 — TASTE**, **Card 3 of 3 — AGENCY**"

✅ "Two halves: **LEFT HALF — OLD TRIANGLE** and **RIGHT HALF — NEW CIRCLE**, with **exactly ONE transformation arrow** between"

✅ "Six numbered sections: 01 (Title), 02 (Title), 03 (Title), 04 (Title), 05 (Title), 06 (Title) — each appears EXACTLY ONCE"

### Examples that fail

❌ "Several cards covering the key themes"
❌ "A comparison between old and new"
❌ "About 6-8 sections summarizing the talk"

---

## Rule 4 — State the Sequence Twice

Once near the top (in the Critical Rules block), once near the bottom (in the "Final reminder" block). The repetition helps Gemini hold the structure across long prompts.

```text
## CRITICAL — STRUCTURE RULES (at top)

- Six sections, in this order: 01, 02, 03, 04, 05, 06 — each appears EXACTLY ONCE.

[... rest of prompt ...]

## Final reminder (at bottom)

The slide has EXACTLY 6 numbered sections, in this order: 01 → 02 → 03 → 04 → 05 → 06.
No duplicates. No omissions. No section 07.
```

This redundancy adds maybe 50 tokens to a 2000-token prompt — worth it.

---

## Rule 5 — Give Each Section a Distinctive Title

If you label sections only by number, Gemini may duplicate based on visual similarity. **Give each section a distinct, memorable title**:

✅ "01 — Two Rebuilds", "02 — The Talent Formula", "03 — Barbell Hiring", "04 — Brewing Beer", "05 — AI as Steel", "06 — Feel the AGI"

❌ "01 — Section One", "02 — Section Two", ...

The title acts as an extra disambiguation signal during rendering.

---

## Rule 6 — Spell Out Math and Special Characters

Gemini sometimes garbles symbolic characters at rendering time. Critical equations should be spelled out alongside the symbol:

| Symbolic | Spelled out (more reliable) |
| --- | --- |
| `talent = capability × taste × agency` | `talent = capability × taste × agency` AND in caption: "Talent equals capability multiplied by taste multiplied by agency" |
| `2→3 transformation` | `2 → 3 transformation` AND "stage 2 to stage 3" |
| `90% ± 5%` | "90 percent, plus or minus 5 percent" alongside the symbol |

The symbol still appears in the rendered output — the spelled-out version is just insurance.

---

## Rule 7 — Use "Card 1 of N" Phrasing

Instead of:

❌ "First card", "second card", "third card"

Use:

✅ "**Card 1 of 3**", "**Card 2 of 3**", "**Card 3 of 3**"

The "of N" pattern tells Gemini the total count up front and reduces the chance of generating an extra card.

---

## Rule 8 — Limit Total Prompt Length

Very long prompts (>2500 words) increase duplication risk. If your prompt is getting long:

- Move boilerplate to the bottom (visual style + don'ts can be terse)
- Cut adjective stacking (one descriptive word per noun, not three)
- Consolidate redundant rules

Aim for **1500-2500 words** for a complex infographic prompt. Below 1000 risks under-specification; above 2500 risks instruction drift.

---

## Rule 9 — When Generation Still Fails

If after applying all the above, an infographic still has a duplication or structural error:

1. **Identify which zone failed** — was it section 4 duplicated, or a card missing, or an extra section appended?
2. **Tighten the language for that specific zone** — add explicit "this section appears exactly once" right after the section's title
3. **Regenerate only that infographic** (not the whole batch)

Don't blindly re-roll — the same prompt usually fails the same way. Fix the prompt first.

If the same prompt fails twice with the same duplication, consider:

- Reducing total section count by one
- Switching aspect ratio (e.g., from 9:16 to a horizontal 16:9 with a 3×2 grid)
- Using a different layout entirely

---

## Rule 10 — Known Gemini Quirks (Beyond Duplication)

These aren't strictly duplication issues but cause similar quality problems:

### Misordered sequences

Sometimes Gemini renders 01, 02, 03, **05**, 04, 06 (out of order). Mitigation: state the sequence twice (Rule 4) and use distinctive titles (Rule 5).

### Missing sections

Sometimes a section disappears entirely. Mitigation: explicit "EXACTLY N sections" and state the title of each.

### Visual size collapse

At 9:16 with 6 sections, sometimes sections 5 and 6 get tiny and unreadable. Mitigation: reduce per-section content density rather than adding more sections.

### Garbled text near image edges

Text in the bottom takeaway banner sometimes renders poorly. Mitigation: keep the banner sentence short (under 12 words).

### Currency / number formatting

`$10T` may render as `$10` (dropping the T) or `$10TT`. Mitigation: spell out as "$10 trillion" alongside the symbol.

---

## Quick Checklist Before Generating

Before sending a prompt to image gen, verify:

- [ ] Critical Rules block is in the first 200 words
- [ ] Section / card / pillar count is stated as "EXACTLY N"
- [ ] Each section has a distinct, memorable title
- [ ] "Card 1 of 3" style numbering used for parallel items
- [ ] Sequence is stated at top AND at bottom (Final Reminder)
- [ ] Math / special chars spelled out alongside the symbol
- [ ] Total prompt length is between 1500-2500 words
- [ ] For 9:16: section count ≤ 6
- [ ] For 16:9 with grids: card count ≤ 7

If any item is unchecked, the prompt is more likely to fail.
