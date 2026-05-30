# self-learning-html

A Claude Code / Codex skill that turns any source material into a self-contained, interactive learning site — index page + 2–4 reading guides + aggregated quiz hub + aggregated flashcard hub. Pure HTML/CSS/JS. No build step, no server, no framework. Open `index.html` in a browser and start learning.

Structurally different from the other skills in MySkills: there is **no deterministic script step**. The whole skill is agent work driven by the four reference files under [`references/`](references/) (content schema, page schemas, design system, JS code patterns). The script-style "deterministic extraction" job is delegated to the existing converter skills (`/url-to-markdown`, `/pdf-to-markdown`, etc.).

## Pipeline

Most invocations fan out like this:

```
non-markdown source ──► STEP 0 routes to converter ──► markdown ──► self-learning-html ──► HTML site
   (URL/PDF/etc.)         (/url-to-markdown, etc.)                    (this skill)
```

| Input | Routed to | Then |
|---|---|---|
| `https://...` (non-YouTube) | `/url-to-markdown` | extract markdown → generate site |
| YouTube URL | `/youtube-to-markdown` | transcript markdown → generate site |
| `*.pdf` | `/pdf-to-markdown` | markdown → generate site |
| `*.docx`, `*.pptx`, `*.xlsx`, `*.csv` | `/office-to-markdown` | markdown → generate site |
| `*.mp3`, `*.wav`, `*.m4a` | `/audio-to-markdown` | transcript markdown → generate site |
| `*.md` / inline markdown | — | generate site directly |
| Multiple mixed sources | each converter, then merge | merged markdown → generate site |

## Output

```
<out>/<slug>/index.html               ← Library home + Practice Hub
<out>/<slug>/guide-01-<topic>.html    ← Reading guide + per-guide quiz + per-guide flashcards
<out>/<slug>/guide-02-<topic>.html    ← (one file per topic cluster, typically 2-4 total)
<out>/<slug>/quiz-index.html          ← All questions from all guides, live scoring
<out>/<slug>/flashcards-index.html    ← All deduplicated flashcards, flat filterable grid
```

`<out>` defaults to `./self-learning-html/`. `<slug>` is derived from the source title (lowercase, alphanumerics joined with `-`, ≤50 chars).

## Sample prompts

```text
turn https://en.wikipedia.org/wiki/Spaced_repetition into a study guide
build a self-learning site from ./papers/transformers.pdf
make this YouTube lecture quizzable: https://youtu.be/abc123
create flashcards and a quiz from notes.md
self-learning-html ./Q3-strategy-deck.pptx
turn this audio recording into a learning page, focus on the key concepts
```

## Runtime requirements

This skill itself needs nothing extra — the agent does all the work using `Read`, `Write`, `Glob`, `WebFetch`, and (optionally) the `Skill` tool to chain converters.

The converters it delegates to have their own requirements (documented in [`MyCompany/MySkills/README.md`](../README.md)):

- `bun` — needed by every converter (already installed on this machine).
- `uv` / `uvx` — needed by `/pdf-to-markdown`, `/office-to-markdown`, `/audio-to-markdown`. One-time install: `pip install uv`.
- `ffmpeg` — only needed by `/audio-to-markdown` for non-WAV inputs.

No API keys for anything.

## Customizing the output

Everything style- and structure-related lives in the four reference files. Edit them in place — there's no compile step.

| File | What to edit |
|---|---|
| [`references/content-schema.md`](references/content-schema.md) | Concept extraction rules, target concept counts per source size, deduplication policy, quality checklist. |
| [`references/page-schemas.md`](references/page-schemas.md) | Exact HTML structure of each generated page. Change the `<head>`, navigation, hero, card grid, etc. here. |
| [`references/design-system.md`](references/design-system.md) | CSS variables, typography (Fraunces + Newsreader + JetBrains Mono), color palette, spacing, component styles. **Extending past 3 guides requires adding palette entries here** — the agent will not invent new accent colors on its own. |
| [`references/code-patterns.md`](references/code-patterns.md) | JS patterns for quiz state machine, scoring, flashcard flip/shuffle/filter, persistence. |

Common tweaks:

- **More than 3 guides** — add `g4`, `g5` color entries to the palette in `design-system.md`. The agent uses whatever's defined; without an entry it will fall back to a neutral and the design will look flat.
- **Different language** — prepend "Output all body content in {language}" to `content-schema.md`. The structural markup stays English; visible text follows the override.
- **Different aesthetic** — swap the font stack and color tokens in `design-system.md`. The page schemas don't hard-code colors; they reference CSS variables.

## Build / package for distribution

```bash
cd ~/.claude/skills/self-learning-html
./package.sh                 # -> dist/self-learning-html.zip
./package.sh v1.0.0          # -> dist/self-learning-html-v1.0.0.zip
```

Hand the zip to a colleague; they `unzip self-learning-html.zip -d ~/.claude/skills/`. The zip contains `SKILL.md`, `README.md`, and the four `references/*.md` files — everything needed to run the skill standalone.

## What this skill is good at

- Articles / blog posts / docs with clear conceptual structure.
- Research papers (especially those with explicit sections like Background / Method / Results).
- Book chapters and long-form tutorials.
- Recorded lectures / talks where the transcript has topic boundaries.

## What it isn't good at

- Source material under ~500 words — produces a thin, padded site.
- Pure reference docs (API listings, glossaries) — no narrative to build guides from.
- Heavily visual material (diagrams, plots) where the markdown conversion loses the meaning. Pre-edit the markdown to add inline explanations before running the skill.
- Multi-modal interactive content (videos that demo code while talking) — only the spoken transcript becomes a guide; the visual demonstration is lost.

## Provenance

First-party skill authored by the user. The four reference files were originally drafted in [`RAW/self-learning-html/`](../../../RAW/self-learning-html/) and the full original schema is preserved at [`RAW/SELF-LEARNING-PAGE-SCHEMA.md`](../../../RAW/SELF-LEARNING-PAGE-SCHEMA.md). This canonical copy lives in `MyCompany/MySkills/self-learning-html/`; updates happen here, not in RAW.
