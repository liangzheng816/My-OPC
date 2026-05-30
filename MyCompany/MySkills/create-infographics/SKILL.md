---
name: create-infographics
description: |
  Generate publication-quality infographics from any markdown content — talk summaries, research papers, product plans, blog posts, dashboards.
  Default visual style: modern enterprise AI / SaaS keynote (white background, blue + orange accents, rounded cards, clean sans-serif, generous whitespace). Optional overrides: chalkboard, aged-academia, technical-schematic, pop-laboratory, morandi-journal.
  Standard outputs: 16:9 landscape infographic per topic/section, 9:16 portrait poster for whole-content overviews, 3:4 portrait for dense-modules infopedia.
  Trigger when the user asks to "create infographic", "generate infographic", "make a poster", "visualize this content", or provides a markdown file and asks for a visual summary.
metadata:
  origin: derived from llm-wiki-skill project
  generation_engine: baoyu-image-gen (bundled in deps/)
  default_provider: google · gemini-3-pro-image-preview
  default_style: executive-saas
---

# Create Infographics

Turn any markdown content into a publication-quality infographic image. Default style is **executive-saas** — modern AI / SaaS keynote aesthetic with white background, enterprise blue + warm orange accents, rounded cards with subtle shadows, generous whitespace, and clean sans-serif typography. Override the style only when the user explicitly names a different aesthetic.

## When To Use This Skill

- User provides markdown content (talk summary, paper, product plan, blog post, etc.) and asks for an infographic
- User says: "create infographic", "generate infographic", "visualize this", "make a poster", "make this a long infographic"
- User asks for a presentation-ready visual from existing notes

**Do NOT trigger when:**

- User just wants the content summarized in text (no visual)
- User wants a chart or technical diagram (use a charting tool instead)
- User wants a UI mockup of a real product (use design tools)
- User wants a photo, illustration, or creative artwork (use generic image gen directly)

## Required Tools & Setup

The skill bundles two dependencies under `deps/`:

1. **`baoyu-image-gen`** — the image generation engine (Google Gemini default; OpenAI, OpenRouter, DashScope, Replicate also supported)
2. **`baoyu-infographic`** — reference content (21 layouts × 20 visual styles) used to ground layout decisions

### Prerequisites

- **`bun`** (preferred) or **`npx`** runtime for `baoyu-image-gen`
- **API key** for at least one image-gen provider (defaults to `GOOGLE_API_KEY`)
- Provider preferences set in `~/.baoyu-skills/baoyu-image-gen/EXTEND.md` (the bundled skill prompts for first-run setup)

See [INSTALL.md](INSTALL.md) for one-command setup.

---

## The Workflow

### Step 1 — Read the source content

Read the markdown file the user pointed at. Identify:

- **Content shape**: does it have a transformation arc (current → future)? Multiple parallel themes? A single dense argument? A maturity progression?
- **Section count**: how many distinct claims, themes, or stages does the content have?
- **Key data points**: numbers, quotes, tables that should be visually emphasized

### Step 2 — Match content shape to layout

Use [references/layouts.md](references/layouts.md) to pick the right layout.

**Quick decision tree:**

| Content shape | Layout | Aspect |
| --- | --- | --- |
| Current → future transformation, 4 stages | 4-stage maturity arc | 16:9 landscape |
| 4-7 parallel themes / cards | bento-grid or n-card horizontal | 16:9 landscape |
| Side-by-side comparison (A vs B, before vs after) | binary-comparison | 16:9 landscape |
| Single deep dive on one framework | dashboard or hub-spoke | 16:9 landscape |
| 6-section overview of a long talk / paper | dense-modules (numbered sections) | **9:16 portrait** |
| High-density infopedia poster (8+ modules) | dense-modules infopedia | **3:4 portrait** |
| Per-vendor / per-section detail | one-card per item | 16:9 landscape |

### Step 3 — Pick the style

**Default: `executive-saas`** — apply unless the user explicitly requests another style.

Override only when:

- User asks for `chalkboard` (workshop / classroom feel)
- User asks for `aged-academia` (vintage scientific journal)
- User asks for `pop-laboratory` (technical precision + pop accents)
- User asks for `morandi-journal` (warm hand-drawn doodle)
- User asks for `technical-schematic` (engineering blueprint)
- User asks for any of the other 20 styles in `deps/baoyu-infographic/references/styles/`

### Step 4 — Build the prompt

Use the template in [references/prompt-template.md](references/prompt-template.md). The template has 4 standard zones:

1. **Top header strip** (master title + subtitle + tiny attribution)
2. **Hero / thesis band** (full-width statement)
3. **Main content** (the layout-specific zone — cards, stages, comparisons, etc.)
4. **Bottom takeaway banner** (dark slate, white text)

**ALWAYS include the anti-duplication safeguards** from [references/anti-duplication.md](references/anti-duplication.md) at the top of the prompt. Gemini is known to duplicate section numbers in dense vertical layouts unless explicitly told not to.

### Step 5 — Generate the image

Call the bundled `baoyu-image-gen` via batch file:

```bash
${BUN_X} {skill-dir}/deps/baoyu-image-gen/scripts/main.ts --batchfile <path-to-batch.json> --json
```

Standard batch file shape:

```json
{
  "jobs": 3,
  "tasks": [
    {
      "id": "overall-poster",
      "promptFiles": ["prompts/overall.md"],
      "image": "overall.png",
      "provider": "google",
      "model": "gemini-3-pro-image-preview",
      "ar": "9:16",
      "quality": "2k"
    }
  ]
}
```

### Step 6 — Verify and iterate

Common Gemini quality issues to check for:

- **Duplicated section badges** (e.g., two "04" sections) — fix by tightening anti-duplication language
- **Illegible small text** at 9:16 with dense layouts — fix by reducing section count
- **Layout drift** (sections rearranged or missing) — fix by adding explicit ordering ("EXACTLY 6 numbered sections, in this order: 01, 02, 03, 04, 05, 06")
- **Garbled equations or special characters** — fix by spelling out (e.g., "capability multiplied by taste multiplied by agency" instead of `×`)

If the image is close but a single zone is wrong, regenerate only that zone (modify the prompt) — don't reroll the whole image.

---

## Output Locations

Save outputs alongside the source MD by default:

```
docs/
└── source-content.md
    ├── prompts/
    │   ├── overall.md
    │   ├── section-01.md
    │   └── section-02.md
    ├── batch.json
    ├── overall.png
    ├── section-01.png
    └── section-02.png
```

Use a `prompts/` subdirectory so iteration is cheap — the user can edit a prompt and re-run just that task.

---

## Examples

See [examples/](examples/) for three worked examples:

- [examples/16x9-section-example.md](examples/16x9-section-example.md) — landscape infographic for a talk section
- [examples/9x16-poster-example.md](examples/9x16-poster-example.md) — vertical poster summarizing a 60-min interview
- [examples/4-stage-arc-example.md](examples/4-stage-arc-example.md) — maturity-arc executive slide

---

## References

- [references/rendering-rules.md](references/rendering-rules.md) — **THE canonical style + layout + structure rules** (read this first)
- [references/prompt-template.md](references/prompt-template.md) — copy-paste prompt skeleton
- [references/anti-duplication.md](references/anti-duplication.md) — Gemini-specific quirks and fixes
- [references/layouts.md](references/layouts.md) — layout cookbook

For the underlying tools:

- [deps/baoyu-image-gen/SKILL.md](deps/baoyu-image-gen/SKILL.md) — image-gen engine reference
- [deps/baoyu-infographic/SKILL.md](deps/baoyu-infographic/SKILL.md) — layout × style reference catalog
