# PMSkills

PM framework advisory system from <https://github.com/liangzheng816/pm-skills>. Two orchestrators plus seven domain specialists covering 100 PM frameworks.

## Install state

- **Global** (effective in every project): cloned to `~/.claude/skills/pm-skills/`. Each of the 9 SKILL.md files is registered at `~/.claude/skills/<skill>/SKILL.md` with `PM_Frameworks/` paths rewritten to absolute (`~/.claude/skills/pm-skills/PM_Frameworks/`) so they resolve from any working directory.
- **Project copy**: this folder holds the same content for in-project reference — [`.claude/skills/`](.claude/skills/) (9 SKILL.md sources), [`PM_Frameworks/`](PM_Frameworks/) (100 framework reference files), [`UPSTREAM_README.md`](UPSTREAM_README.md), [`SOURCE_CLAUDE.md`](SOURCE_CLAUDE.md).

## The 9 skills

### Orchestrators

| Skill | Role | What it does |
| --- | --- | --- |
| [/advise-frameworks](.claude/skills/advise-frameworks/SKILL.md) | Triage & Router | Auto-invocable. Diagnoses your situation and routes to 2-3 frameworks across the 7 domain specialists. The entry point. |
| [/pm-debate](.claude/skills/pm-debate/SKILL.md) | Debate Orchestrator | Spawns up to 7 domain specialists as sub-agents in parallel on the same problem. Synthesizes consensus, disagreement, blind spots, ranked frameworks. |

### Seven domain specialists

| Skill | Role | Frameworks |
| --- | --- | --- |
| [/discover-users](.claude/skills/discover-users/SKILL.md) | User Researcher | Design thinking, JTBD, journey/empathy maps, personas, Kano, contextual inquiry, diary studies, service blueprint, affinity diagrams. |
| [/frame-problems](.claude/skills/frame-problems/SKILL.md) | Problem Definer | 5 Whys, HMW, Double Diamond, Cynefin, Working Backwards, POV, problem trees, iceberg model, mental models. |
| [/generate-ideas](.claude/skills/generate-ideas/SKILL.md) | Ideator | SCAMPER, Six Thinking Hats, Crazy 8s, Reverse Brainstorming, Story Spine, TRIZ, Analogical Thinking, Value Proposition Canvas. |
| [/validate-bets](.claude/skills/validate-bets/SKILL.md) | Validator | Lean Startup MVP, A/B testing, Wizard of Oz, 5-user testing, HEART, Lean Canvas, North Star, Problem-Solution Fit. |
| [/ship-decisions](.claude/skills/ship-decisions/SKILL.md) | Prioritizer | RICE, MoSCoW, Impact/Effort, Shape Up, Now-Next-Later, DACI, ICE, OGSM, design sprints. |
| [/grow-product](.claude/skills/grow-product/SKILL.md) | Growth Strategist | AARRR, growth flywheels, Hook Model, PMF, Blue Ocean, LTV/CAC, GTM, STP, Fogg behavior model, network effects. |
| [/think-systems](.claude/skills/think-systems/SKILL.md) | Systems Strategist | First principles, Wardley mapping, Three Horizons, Business Model Canvas, Theory of Constraints, Porter's Five Forces, Antifragile, Pre-Mortem. |

## Recommended flow

`discover-users` → `frame-problems` → `generate-ideas` → `validate-bets` → `ship-decisions` → `grow-product`. Drop in `think-systems` at any stage for strategic reframing.

## How global routing works

`/advise-frameworks` is the only auto-invocable skill (`disable-model-invocation: false`). Domain specialists are user-invocable but won't auto-trigger — invoke by name (`/frame-problems`, etc.) or let `/advise-frameworks` route to them. `/pm-debate` runs forked context and spawns specialists via the Agent tool.

## Sample prompts

```text
/advise-frameworks our onboarding takes 14 days and we're losing 60% of trial signups
/pm-debate should we build the AI assistant as a sidebar or a separate workspace
/frame-problems the support team keeps escalating "billing is confusing" tickets — why
/discover-users we're entering the dental-practice vertical for the first time
/validate-bets we think users want template gallery — cheapest way to test before building
/ship-decisions Q1 roadmap has 14 candidates and 3 engineers, what gets cut
```

## Updating

```bash
cd ~/.claude/skills/pm-skills && git pull
```

Then re-run the path-rewrite step for any updated SKILL.md (see commit history of this repo for the sed pattern used).
