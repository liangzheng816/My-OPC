# Example — 9:16 Vertical Poster (Whole-Talk Summary)

A worked example showing the prompt for a vertical long-form poster summarizing a 60-minute interview.

**Source content:** Full Ivan Zhao ↔ Brian Halligan interview about rebuilding Notion twice and the AI-era CEO playbook.

**Layout chosen:** 6-section dense-modules poster (CRITICAL: max 6 sections at 9:16 to avoid the duplicated-badge bug).

---

## Why 6 Sections, Not 8?

The first version of this prompt had 8 sections (talent formula, jazz mode, brewing beer, sales reorg, Kyoto, Cancún, AI-as-steel, feel-the-AGI). Gemini duplicated "section 04" — rendering it twice in the middle of the poster.

**The fix:** consolidate to 6 sections. Two Rebuilds (Kyoto + Cancún combined), Talent Formula, Barbell Hiring, Brewing Beer, AI as Steel, Feel the AGI.

This is **Rule 1** from [anti-duplication.md](../references/anti-duplication.md): **9:16 maxes out at 6 sections**.

---

## The Prompt

```text
Create a long-form vertical infographic poster — 9:16 portrait aspect ratio, modern enterprise AI / SaaS keynote presentation style.

## CRITICAL — ANTI-DUPLICATION RULES

- The poster has EXACTLY 6 numbered sections, in this order: 01, 02, 03, 04, 05, 06
- DO NOT duplicate any section number. Each badge appears exactly once.
- DO NOT skip any section number. The sequence must be complete: 01 → 02 → 03 → 04 → 05 → 06
- Each section has a distinct title and distinct visual treatment, listed below
- After the bottom takeaway banner, NO additional sections, NO repeated content
- If unsure about layout space, REDUCE detail in each section rather than duplicate or omit one

## Master title block (top ~10% of height)

- Master title (very large, bold, dark slate #0F172A, sans-serif): "Brian Halligan ↔ Ivan Zhao"
- Subtitle (medium, slate #475569): "The Canonical SaaS-to-AI Refounder"
- Tiny attribution (#94A3B8): "Sequoia interview · Ivan Zhao, co-founder & CEO of Notion · ~62 min"
- Thin blue (#2563EB) divider line below

## Thesis band (full-width card, light blue wash #EFF6FF, NO section badge here)

Single bold callout: "Notion rebuilt itself twice — once in Kyoto in 2015, once in Cancún in 2023. The pattern: a body-level decision, a dark middle, and an obsession that outlasts every doubt."

Attribution beneath in slate italic: "— Master thesis"

## SECTION 01 — TWO REBUILDS (badge "01")

Section header (bold, with circular blue "01" badge): "Refounded Twice"

Two equal-width side-by-side columns:

LEFT — KYOTO (2015) — orange #F97316 accent
- Down to 2 people
- No PMF, money out
- "Code, eat, code, eat — liberating"

RIGHT — CANCÚN (2023) — blue #2563EB accent
- 500 employees
- GPT-4 early access
- "Full-body religious experience"
- 18-month dark period

Caption: "Both rebuilds: body-level decision + dark middle + obsession-as-fuel."

## SECTION 02 — THE TALENT FORMULA (badge "02")

Header with circular blue "02" badge: "The Talent Formula"

Large equation: talent = capability × taste × agency

Three pillar cards:
- CAPABILITY (orange) — "Democratized by LLMs"
- TASTE (blue) — "Value system. Still scarce."
- AGENCY (blue) — "Will. Cannot replace."

## SECTION 03 — BARBELL HIRING (badge "03")

Header with "03" badge: "Barbell Hiring"

Vertical stack diagram:
Senior architects → manages 2-3 → Junior ICs → each rides 2-3 → Coding agents

Caption: "Middle tier squeezed. One senior + juniors + agents = enormous output cone."

## SECTION 04 — BREWING BEER, NOT BUILDING BRIDGES (badge "04")

Header with "04" badge: "Product Methodology"

Two cards:
- BRIDGES (orange) — Classic SaaS: design it, build it, predictable
- BEER (blue) — LLM era: throw best people in, observe, technology-first

Caption: "Designer + engineer + PM in the same bucket. Working with evals."

## SECTION 05 — AI IS THE STEEL FOR ORGANIZATIONS (badge "05")

Header with "05" badge: "AI Is the Steel for Organizations"

Two-stage metaphor comparison:
- Pre-Steel: buildings limited to 5-6 stories
- Post-Steel: skyscrapers possible

Then applied to orgs:
- Pre-LLM: triangle org chart, slow plumbing
- Post-LLM: same hierarchy, leaner; AI as connective tissue

Caption: "Hierarchy hasn't changed since chimps. What changes is the plumbing."

## SECTION 06 — FEEL THE AGI + BE YOURSELF (badge "06")

Header with "06" badge: "Feel the AGI + Be Yourself"

Two-word advice rendered large: "FEEL THE AGI"

Underneath: "Companies are pathfinding entities. New ingredients open doors and close others. You have to feel the material — reading articles and watching videos doesn't work."

Closing quote: "Be yourself, everyone else is taken." — Oscar Wilde

## Bottom takeaway banner (full-width dark slate #0F172A, white text)

"Refound now. Brew beer, not bridges. Hire for taste. Lean into your strengths. Feel the AGI."

Below in muted-white: "Sources: Brian Halligan & Ivan Zhao interview · Sequoia Capital · ~62 min"

## Visual style — modern enterprise AI / SaaS keynote

[standard executive-saas style block — see references/rendering-rules.md]

## Final reminder

The poster has EXACTLY 6 numbered sections, in this order: 01 → 02 → 03 → 04 → 05 → 06. No duplicates. No section 07. No skipped numbers.
```

---

## Key Lessons This Example Demonstrates

1. **Rule 1 — Cap at 6 sections at 9:16** — even when the content has 8 themes, consolidate
2. **Anti-duplication block at the top** — first 200 words, weighted most heavily by Gemini
3. **State sequence twice** — once in Critical Rules, once in Final Reminder
4. **Each section has a distinct memorable title** — not "Section 04" but "Brewing Beer, Not Building Bridges"
5. **Hero thesis band without a section badge** — distinguishes it from numbered sections
6. **Semantic color coding** — Kyoto/Cancún uses orange/blue to signal first/second rebuild progression
7. **Bottom takeaway as 5-verb action line** — "Refound. Brew. Hire. Lean. Feel."
