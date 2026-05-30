# Example — 16:9 Section Infographic (Talent Formula)

A worked example showing the prompt for a single-section infographic in 16:9 landscape format.

**Source content:** Section of a CEO interview discussing the talent formula `talent = capability × taste × agency`.

**Layout chosen:** 3-card horizontal (hero band with equation + 3 pillar cards + barbell hiring diagram + bottom takeaway).

---

## The Prompt

```text
Create a 16:9 modern enterprise AI / SaaS keynote infographic slide. Polished pitch-deck visual, clean typography.

## CRITICAL — STRUCTURE RULES

- The slide has exactly 4 content zones, in this top-to-bottom order:
  1. Top header strip (title + subtitle + attribution)
  2. Hero band (the equation, full-width card)
  3. Three pillar cards (Capability / Taste / Agency, side-by-side)
  4. Lower band (Barbell hiring diagram)
- Followed by a bottom takeaway banner (full-width dark slate)
- DO NOT duplicate any pillar. The three pillars are EXACTLY: Capability, Taste, Agency — each appearing once.
- DO NOT add additional pillars or sections beyond what's listed.

## Layout

**Top header strip:**
- Master title (large, bold, dark slate #0F172A): "The Talent Formula & Barbell Hiring"
- Subtitle (medium, slate #475569): "How Ivan Zhao restructured Notion's hiring around LLMs"
- Tiny attribution (#94A3B8): "Brian Halligan ↔ Ivan Zhao · Sequoia 2026"

**Hero band — The Formula (full-width card, light blue wash #EFF6FF):**

Display the equation centered, very large:

talent = capability × taste × agency

Below in slate italic: "Language models changed the weights in this formula."

**Main row — Exactly 3 pillar cards (3 equal-width columns, NO duplicates):**

Card 1 of 3 (orange #F97316 accent on top edge) — "CAPABILITY"
- Subtitle: "What used to be scarce"
- Body: Coding, writing, analysis, learning speed
- Big tag pill (orange): "DEMOCRATIZED"
- Small line icon: a chip or brain glyph

Card 2 of 3 (blue #2563EB accent on top edge) — "TASTE"
- Subtitle: "Still scarce. Still you."
- Body: Value system. What direction. What "good" looks like.
- Big tag pill (blue): "AMPLIFY"
- Small line icon: a compass or palette

Card 3 of 3 (blue #2563EB accent on top edge) — "AGENCY"
- Subtitle: "Still scarce. Still required."
- Body: Will. Action. Persistence. Cannot replace.
- Big tag pill (blue): "AMPLIFY"
- Small line icon: an arrow or runner

**Lower band — Barbell Hiring (full-width card, subtle slate #F8FAFC):**

Section header: "What Falls Out: Barbell Hiring"

Vertical leverage diagram:
SENIOR ARCHITECT
  ↓ manages 2-3
JUNIOR ICs
  ↓ each rides 2-3
CODING AGENTS

Side note: "Middle-tier engineer squeezed — expensive, no irreplaceable role."

**Bottom takeaway banner (full-width, dark slate #0F172A background, white text):**

"Capabilities are commoditized by machines. Your taste and agency are not."

Smaller white text below: "One senior + 2-3 juniors + ~6-9 coding agents = enormous output cone."

## Visual style — modern enterprise AI / SaaS keynote

- White (#FFFFFF) background
- Clean modern sans-serif typography
- Generous whitespace, rounded cards (8-12px), subtle drop-shadows, thin 1px #E2E8F0 borders
- Simple line icons only

## Strict palette

- Background #FFFFFF / #F8FAFC
- Primary text #0F172A, secondary #475569, muted #94A3B8
- Card border #E2E8F0
- Accent 1 (Capability — democratized) — orange #F97316
- Accent 2 (Taste, Agency — durable) — blue #2563EB
- Soft washes #EFF6FF (blue), #FFF7ED (orange)
- Dark slate banner #0F172A

## Don'ts

- DO NOT duplicate any pillar card. Exactly 3 pillars: Capability, Taste, Agency.
- No dark backgrounds (except bottom banner), no gradients, no glossy effects, no photorealism
- No hand-drawn / chalk / sketch aesthetic
- Strictly blue + orange + neutrals
```

---

## The Batch File

```json
{
  "tasks": [
    {
      "id": "talent-formula-barbell",
      "promptFiles": ["prompts/talent-formula-barbell.md"],
      "image": "talent-formula-barbell.png",
      "provider": "google",
      "model": "gemini-3-pro-image-preview",
      "ar": "16:9",
      "quality": "2k"
    }
  ]
}
```

---

## Generation Command

```bash
cd <output-directory>
bun ~/.claude/skills/create-infographics/deps/baoyu-image-gen/scripts/main.ts \
    --batchfile batch.json --json
```

Or using `npx`:

```bash
npx -y bun ~/.claude/skills/create-infographics/deps/baoyu-image-gen/scripts/main.ts \
    --batchfile batch.json --json
```

---

## Key Lessons This Example Demonstrates

1. **Anti-duplication block at top** — "EXACTLY 3 pillars: Capability, Taste, Agency"
2. **Card numbering** — "Card 1 of 3", "Card 2 of 3", "Card 3 of 3"
3. **Semantic color assignment** — orange for the democratized (lost) factor, blue for the durable (kept) factors
4. **Hero band with equation** — uses the full-width light-blue wash card pattern
5. **Bottom takeaway banner** — dark slate, white text, single sentence + smaller attribution
6. **Specific font/color callouts in every zone** — Gemini renders more accurately when you specify per zone
