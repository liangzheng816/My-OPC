# gstack skill reference

Per-skill summaries for the 47 gstack skills installed in this repo. Split into two tiers:

- **[KeySkills/](KeySkills/)** — the 26 specialists from Garry Tan's "virtual engineering team" lineup. These are the everyday hats: CEO, eng manager, designer, QA, security officer, release engineer, etc.
- **[SubSkills/](SubSkills/)** — 21 supporting tools, safety toggles, and lower-level primitives that the key skills lean on.

Each file follows the same shape: tagline, summary, when to use, sample prompts, how it works, notes, related skills.

## KeySkills — the specialists

| Skill | Role | What they do |
| --- | --- | --- |
| [/office-hours](KeySkills/office-hours.md) | YC Office Hours | Six forcing questions that reframe your product *before* code. Feeds every downstream skill. |
| [/plan-ceo-review](KeySkills/plan-ceo-review.md) | CEO / Founder | Rethink the problem. Find the 10-star product. Four modes: Expansion, Selective, Hold, Reduction. |
| [/plan-eng-review](KeySkills/plan-eng-review.md) | Eng Manager | Lock in architecture, data flow, diagrams, edge cases, tests. Forces hidden assumptions open. |
| [/plan-design-review](KeySkills/plan-design-review.md) | Senior Designer | Rates each design dimension 0-10, explains what 10 looks like, edits the plan. AI-slop detection. |
| [/plan-devex-review](KeySkills/plan-devex-review.md) | DX Lead | Personas, TTHW benchmark, magical-moment design, friction trace. 3 modes, 20-45 questions. |
| [/design-consultation](KeySkills/design-consultation.md) | Design Partner | Build a design system from scratch. Researches landscape, proposes creative risks, mocks. |
| [/review](KeySkills/review.md) | Staff Engineer | Find bugs that pass CI but blow up in prod. Auto-fixes the obvious ones. |
| [/investigate](KeySkills/investigate.md) | Debugger | Root-cause debugging. Iron Law: no fixes without investigation. Stops after 3 failed attempts. |
| [/design-review](KeySkills/design-review.md) | Designer Who Codes | Visual audit of a live site, then fixes what it finds. Atomic commits, before/after screenshots. |
| [/devex-review](KeySkills/devex-review.md) | DX Tester | Live onboarding test: navigate docs, time TTHW, screenshot errors. Boomerang vs plan-devex-review. |
| [/design-shotgun](KeySkills/design-shotgun.md) | Design Explorer | "Show me options." 4-6 AI mockup variants, comparison board, taste memory, iterate. |
| [/design-html](KeySkills/design-html.md) | Design Engineer | Mockup → production HTML/CSS. Pretext computed layout. 30KB, zero deps. |
| [/qa](KeySkills/qa.md) | QA Lead | Test, find bugs, fix them, atomic commits, re-verify. Auto-generates regression tests. |
| [/qa-only](KeySkills/qa-only.md) | QA Reporter | Same scan, report only — no fixes. |
| [/pair-agent](KeySkills/pair-agent.md) | Multi-Agent Coordinator | Share your browser with any AI agent. Scoped tokens, tab isolation, activity attribution. |
| [/cso](KeySkills/cso.md) | Chief Security Officer | OWASP Top 10 + STRIDE. 17 false-positive exclusions, 8/10+ confidence gate, exploit scenarios. |
| [/ship](KeySkills/ship.md) | Release Engineer | Sync main, test, audit coverage, push, open PR. Bootstraps test framework if missing. |
| [/land-and-deploy](KeySkills/land-and-deploy.md) | Release Engineer | Merge PR, wait for CI/deploy, verify prod health. |
| [/canary](KeySkills/canary.md) | SRE | Post-deploy monitoring. Console errors, perf regressions, page failures. |
| [/benchmark](KeySkills/benchmark.md) | Performance Engineer | Baseline page-load times, Core Web Vitals, resource sizes. Before/after on every PR. |
| [/document-release](KeySkills/document-release.md) | Technical Writer | Update all docs to match what just shipped. Catches stale READMEs. |
| [/retro](KeySkills/retro.md) | Eng Manager | Team-aware weekly retro. Per-person breakdowns, shipping streaks, growth opportunities. |
| [/browse](KeySkills/browse.md) | QA Engineer | Real Chromium. Real clicks. Real screenshots. ~100ms per command. |
| [/setup-browser-cookies](KeySkills/setup-browser-cookies.md) | Session Manager | Import cookies from Chrome/Arc/Brave/Edge for authenticated QA. |
| [/autoplan](KeySkills/autoplan.md) | Review Pipeline | One command, fully reviewed plan. CEO → design → eng → DX with encoded decision principles. |
| [/learn](KeySkills/learn.md) | Memory | Manage what gstack learned across sessions. Patterns, pitfalls, preferences. |

## SubSkills — supporting tools

### Safety & session control

- [/careful](SubSkills/careful.md) — warn before destructive commands (rm -rf, DROP TABLE, force-push)
- [/freeze](SubSkills/freeze.md) — restrict edits to one directory for the session
- [/unfreeze](SubSkills/unfreeze.md) — clear the freeze
- [/guard](SubSkills/guard.md) — `/careful` + `/freeze` together
- [/context-save](SubSkills/context-save.md) — save working context (git state, decisions, todo)
- [/context-restore](SubSkills/context-restore.md) — resume from the last save

### Browser & scraping primitives

- [/open-gstack-browser](SubSkills/open-gstack-browser.md) — visible Chromium window with sidebar
- [/connect-chrome](SubSkills/connect-chrome.md) — alternative trigger for the same headed-browser skill
- [/gstack](SubSkills/gstack.md) — the headless browser primitive that `/browse` wraps
- [/scrape](SubSkills/scrape.md) — pull structured data from a page; prototypes then codifies
- [/skillify](SubSkills/skillify.md) — codify the last `/scrape` into a permanent browser-skill

### Setup & maintenance

- [/setup-deploy](SubSkills/setup-deploy.md) — persist deploy config for `/land-and-deploy`
- [/setup-gbrain](SubSkills/setup-gbrain.md) — install gbrain CLI, init brain, register MCP
- [/sync-gbrain](SubSkills/sync-gbrain.md) — keep the gbrain index current with this repo
- [/gstack-upgrade](SubSkills/gstack-upgrade.md) — upgrade gstack (global or vendored)
- [/plan-tune](SubSkills/plan-tune.md) — silence repeated AskUserQuestion prompts

### Other

- [/landing-report](SubSkills/landing-report.md) — read-only version-slot dashboard for `/ship`
- [/codex](SubSkills/codex.md) — OpenAI Codex CLI wrapper (review / challenge / consult)
- [/benchmark-models](SubSkills/benchmark-models.md) — cross-model shootout for the same prompt
- [/health](SubSkills/health.md) — composite 0-10 code-quality score
- [/make-pdf](SubSkills/make-pdf.md) — markdown → publication-quality PDF

## Typical pipelines

- **Idea → shipped feature:** `/office-hours` → `/plan-ceo-review` → `/plan-eng-review` → `/autoplan` → code → `/review` → `/qa` → `/ship` → `/land-and-deploy` → `/document-release`
- **Bug report:** `/investigate` → fix → `/qa` → `/ship`
- **Pre-launch security pass:** `/cso` → triage → fix → `/cso` again
- **Visual polish:** `/design-shotgun` → `/design-html` → `/design-review`
- **Authenticated QA:** `/setup-browser-cookies` → `/qa`

## Source

- Repo: <https://github.com/garrytan/gstack>
- License: MIT
- Global install: `~/.claude/skills/gstack`
- Project enforcement: see [../CLAUDE.md](../CLAUDE.md) and [../.claude/settings.json](../.claude/settings.json)
