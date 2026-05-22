# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A **PM Framework Advisory System** — 9 Claude Code skills covering 100 PM frameworks across 7 domains. Each skill is a specialized product management consultant invocable via `/slash-command`. The `PM_Frameworks/` directory at the repo root holds detailed reference files that skills read on demand.

## Architecture

### Three Roles

1. **Router** (`/advise-frameworks`) — Triages the user's situation and routes to the right specialist. Contains the complete index of all 100 frameworks. The only auto-invocable skill (`disable-model-invocation: false`).
2. **Domain Specialists** (7 skills) — Self-contained system prompts, one per PM domain. Each has: framework toolkit table, deep framework knowledge, interaction patterns, cross-group handoffs, and a Debate Mode Response Format section.
3. **Debate Orchestrator** (`/pm-debate`) — Spawns domain specialists as sub-agents in parallel via the Agent tool, collects structured analyses, and synthesizes a report. Runs in a forked context (`context: fork`).

### Skill Files → Domains

| Skill | File | Domain | # |
|-------|------|--------|----|
| `/discover-users` | `.claude/skills/discover-users/SKILL.md` | User Insights & Research | 12 |
| `/frame-problems` | `.claude/skills/frame-problems/SKILL.md` | Problem Framing & Definition | 17 |
| `/generate-ideas` | `.claude/skills/generate-ideas/SKILL.md` | Ideation & Concept Design | 14 |
| `/validate-bets` | `.claude/skills/validate-bets/SKILL.md` | Validation & Testing | 14 |
| `/ship-decisions` | `.claude/skills/ship-decisions/SKILL.md` | Execution & Prioritization | 15 |
| `/grow-product` | `.claude/skills/grow-product/SKILL.md` | Growth & Market Strategy | 15 |
| `/think-systems` | `.claude/skills/think-systems/SKILL.md` | Systems Thinking & Strategy | 12 |
| `/advise-frameworks` | `.claude/skills/advise-frameworks/SKILL.md` | Router / Triage | 100 |
| `/pm-debate` | `.claude/skills/pm-debate/SKILL.md` | Multi-Expert Debate | 100 |

### How Skills Link to PM_Frameworks

Each domain skill's **Framework Toolkit table** lists `PM_Frameworks/NNN_name.md` paths. Skills have `allowed-tools: Read` so Claude reads the detailed framework file on demand when a user asks for depth. The skill SKILL.md contains condensed knowledge (1-2 paragraph summaries); the `PM_Frameworks/` files have the full 11-section reference. This keeps skill context small while allowing deep dives.

Cross-domain references exist — e.g., `/grow-product` references Innovation Diffusion Curve from `/generate-ideas`, `/think-systems` references Iceberg Model from `/frame-problems`. These work because all skills share the same `PM_Frameworks/` directory at the repo root.

### Cross-Skill Conventions

- Skills reference each other via `/skill-name` slash commands.
- Flow chain: `discover-users → frame-problems → generate-ideas → validate-bets → ship-decisions → grow-product`, with `think-systems` at any point.
- Each domain skill has a **Debate Mode Response Format** section — a structured template activated when `[DEBATE MODE ACTIVE]` is prepended. This is how `/pm-debate` integrates them.

### pm-debate Orchestration

3-phase process (Phases 1-2 are silent, only Phase 3 produces user-visible output):
1. **Intake** — Parses problem + optional modifiers (`--skills`, `--versus`)
2. **Dispatch** — Reads `.claude/skills/{name}/SKILL.md` for each selected skill, then spawns all sub-agents in parallel via Agent tool
3. **Synthesis** — Structured report: consensus, tensions, blind spots, top frameworks, recommended sequence. Adversarial format for `--versus` two-expert mode.

## SKILL.md Structure

### YAML Frontmatter Fields

| Field | Used By | Purpose |
|-------|---------|---------|
| `name` | All | Slash-command name |
| `description` | All | When to invoke (Claude uses this for auto-invocation) |
| `user-invocable: true` | All | Appears in `/` autocomplete |
| `disable-model-invocation` | All | `false` only for `advise-frameworks` (auto-invocable); `true` for all others |
| `allowed-tools: Read` | Domain skills, router | Enables reading PM_Frameworks files |
| `allowed-tools: Read Agent` | pm-debate | Also needs Agent for spawning sub-agents |
| `context: fork` | pm-debate only | Isolates multi-agent orchestration from main conversation |

### Body Structure (domain skills)

Every domain skill follows this section order — maintain it when editing:
1. Intro paragraph (role definition)
2. **Framework Toolkit** table (columns: #, Framework, Best For, Source File)
3. **Deep Framework Knowledge** (1-2 paragraph summaries per framework)
4. **How You Help** (interaction patterns by situation type)
5. **Cross-Group Handoffs** (when to route to other skills)
6. **Key Principles** (domain-specific guidelines)
7. **Debate Mode Response Format** (8 sections: Domain, Position, Key Diagnosis, Recommended Frameworks, Evidence & Reasoning, Risks If Ignored, Points of Likely Disagreement, Handoff Conditions)

## PM_Frameworks/ Directory

100 framework files (`001_design-thinking.md` through `100_pre-mortem.md`) plus:
- `000_README.md` — generation notes and confidence conventions
- `framework_manifest.json` / `.csv` — index with order, name, group, filename, confidence

Each framework file has YAML frontmatter (`title`, `category`, `pmframe_order`, `confidence`, `canonical_status`) and 11 sections: summary, problem solved, canonical origin, canonical structure, when to use, practical guidance, inputs/outputs/success criteria, PM example, strengths/limitations/mistakes, authority trail.

Confidence: "High" = canonical framework with recognized creator. "Moderate" = practitioner method or composite tool without one official source.

## Development Notes

This is a **content-only repo** — all files are Markdown or JSON. There is no build step, linter, or test suite. Validation is manual (see consistency checks below).

`.claude/settings.local.json` is gitignored. No shared `settings.json` exists.

### Consistency Checks

The repo has implicit invariants. After editing, verify:

- **Framework count**: `ls PM_Frameworks/0*.md | wc -l` should equal 100 (excludes `000_README.md` — use `ls PM_Frameworks/0[0-9][1-9]*.md PM_Frameworks/0[1-9][0-9]*.md | wc -l`)
- **Manifest sync**: entries in `framework_manifest.json` must match filenames in `PM_Frameworks/`
- **Debate Mode headings**: all 7 domain skills must use identical `### Heading` names in their Debate Mode Response Format section. The 8 headings are: Domain, Position, Key Diagnosis, Recommended Frameworks, Evidence & Reasoning, Risks If Ignored, Points of Likely Disagreement, Handoff Conditions
- **Router completeness**: the 100-entry index in `advise-frameworks/SKILL.md` must list every framework
- **Toolkit table paths**: each `Source File` cell in a domain skill's Framework Toolkit table must point to an existing `PM_Frameworks/NNN_*.md` file

## Editing Guidelines

### Adding a new framework (checklist)

1. Create `PM_Frameworks/NNN_new-framework.md` with YAML frontmatter matching existing convention
2. Add entry to `PM_Frameworks/framework_manifest.json` and `framework_manifest.csv`
3. Add row to the Framework Toolkit table in the appropriate domain skill's SKILL.md
4. Add a Deep Framework Knowledge summary paragraph in the same SKILL.md
5. Add the framework to the master index in `.claude/skills/advise-frameworks/SKILL.md`
6. Framework numbering is global (1–100). New frameworks continue the sequence or fill the Appendix

### Editing Debate Mode sections

The 8 heading names in Debate Mode Response Format must be **identical across all 7 domain skills** — `/pm-debate` depends on this structure to parse sub-agent responses.

### Cross-domain framework references

When a skill references a framework from another domain, use the pattern: `Framework Name (from /other-skill)`. This preserves the slash-command link.
