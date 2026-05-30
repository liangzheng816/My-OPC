# create-infographics

Generate publication-quality infographics from any markdown content. Default style is **modern enterprise AI / SaaS keynote** — white background, blue + orange accents, rounded cards with subtle shadows, generous whitespace, clean sans-serif typography.

## What This Skill Does

You give it markdown content (a talk summary, paper, product plan, blog post, dashboard, anything). It picks the right layout, applies the canonical style, and generates a polished infographic image via Google Gemini (or any of 7 supported image-gen providers).

## What Makes It Different

- **Battle-tested rendering rules** — derived from real production failures (duplicated section bug, layout drift, illegible text at scale). See [references/anti-duplication.md](references/anti-duplication.md).
- **Self-contained** — bundles both `baoyu-image-gen` (the engine) and `baoyu-infographic` (the layout/style reference) into `deps/`. No external skill installs required beyond the runtime (`bun` or `npx`).
- **Style is the project default** — the executive-saas style is documented end-to-end in [references/rendering-rules.md](references/rendering-rules.md). Override only when user explicitly asks.
- **Portable** — works for Claude Code, Codex, OpenClaw, or any agent that can invoke skills with shell access.

## Quick Look at the Output Style

Default style (executive-saas):
- White background (#FFFFFF)
- Enterprise blue `#2563EB` for future / positive states
- Warm orange `#F97316` for current pain / burden / transition
- Rounded cards (8-12px), subtle shadows, thin cool-gray borders
- Clean modern sans-serif (Inter / Helvetica feel)
- Generous whitespace
- Section numbered badges in solid blue
- Dark slate `#0F172A` bottom banner for the takeaway

Supported overrides: chalkboard, aged-academia, pop-laboratory, morandi-journal, technical-schematic, corporate-memphis, and 14 other styles bundled in `deps/baoyu-infographic/`.

## Installation

See [INSTALL.md](INSTALL.md) for platform-specific instructions. Short version:

**Claude Code:**

```bash
cp -r create_infographics ~/.claude/skills/
```

**Codex:**

```bash
cp -r create_infographics ~/.codex/skills/
```

**Prerequisites:**

- `bun` (preferred) or `npx`
- `GOOGLE_API_KEY` env var (or one of the other supported providers — see [deps/baoyu-image-gen/SKILL.md](deps/baoyu-image-gen/SKILL.md))

## Usage

After installation, in any project:

```text
You: Create an infographic for c:/path/to/my-summary.md
[skill: create-infographics]
```

The skill will:

1. Read the source markdown
2. Identify content shape (transformation arc / parallel themes / dense overview / etc.)
3. Pick the right layout from [references/layouts.md](references/layouts.md)
4. Apply the executive-saas style from [references/rendering-rules.md](references/rendering-rules.md)
5. Generate the prompt using the template from [references/prompt-template.md](references/prompt-template.md)
6. Call `baoyu-image-gen` via the bundled batch.json
7. Save the output PNG alongside the source file

## File Map

```
create_infographics/
├── SKILL.md                          # entry point — describes when/how to use
├── README.md                         # this file
├── INSTALL.md                        # platform-specific install instructions
├── references/
│   ├── rendering-rules.md            # THE canonical style guide (read first)
│   ├── prompt-template.md            # copy-paste prompt skeleton
│   ├── anti-duplication.md           # Gemini-specific quirks and fixes
│   └── layouts.md                    # layout cookbook
├── examples/
│   ├── 16x9-section-example.md       # landscape infographic example
│   ├── 9x16-poster-example.md        # vertical poster example
│   └── 4-stage-arc-example.md        # maturity-arc executive slide example
├── deps/
│   ├── baoyu-image-gen/              # the image-gen engine (bundled)
│   └── baoyu-infographic/            # layout + style reference catalog (bundled)
└── scripts/
    ├── install.sh                    # one-command install for mac/linux/git-bash
    └── install.ps1                   # PowerShell installer for Windows
```

## Origin

Extracted from the `llm-wiki-skill` project where this style was developed and battle-tested across ~30 infographics (Sequoia AI Ascent talks, arXiv papers, Gartner reports, WeChat articles, YouTube interviews). The bundled rendering rules survived real Gemini failures and have anti-duplication safeguards built in.

## License

Inherits the licenses of the bundled dependencies:

- `baoyu-image-gen` (MIT) — by JimLiu
- `baoyu-infographic` (MIT) — by JimLiu

The skill-level documentation (`SKILL.md`, `references/`, `examples/`) is MIT.
