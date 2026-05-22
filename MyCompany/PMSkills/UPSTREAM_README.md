# PM Skills for Claude Code

**100 product management frameworks, organized into 7 specialist domains, accessible as Claude Code slash commands.**

Describe your product challenge in plain language. The system recommends the right frameworks, walks you through them step-by-step, or runs a multi-expert debate to surface tensions and blind spots you'd miss working alone.

## Quick Start

Requires [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI, VS Code extension, or JetBrains plugin).

```bash
# Clone into your project or open as a standalone workspace
git clone <this-repo> && cd pm-skills
```

Then in Claude Code:

```
/advise-frameworks Our onboarding takes 14 days and we're losing 60% of trial signups
```

## The Two Orchestrators

### `/advise-frameworks` — Triage & Route

The entry point. Describe your situation; it diagnoses which domain(s) apply and recommends 2-3 specific frameworks with reasoning.

```
/advise-frameworks We have user research but keep building features nobody asked for
```

It maps your signal to the right specialist:

| Signal | Routes to |
|--------|-----------|
| "We don't understand our users" | `/discover-users` |
| "Problem is vague, feels like symptoms" | `/frame-problems` |
| "Problem is clear, need solution ideas" | `/generate-ideas` |
| "Have an idea, is it worth building?" | `/validate-bets` |
| "What should we build first?" | `/ship-decisions` |
| "Growth is stalled" | `/grow-product` |
| "We keep solving the same problems" | `/think-systems` |

### `/pm-debate` — Multi-Expert Panel

Spawns up to 7 domain specialists in parallel to analyze the same problem, then synthesizes a structured report: consensus, tensions, blind spots, ranked frameworks, and a recommended sequence.

```
# Full 7-expert panel
/pm-debate Our SaaS has 10K users but only 2% convert to paid

# Select specific experts
/pm-debate --skills discover-users,validate-bets,grow-product Why aren't free users upgrading?

# Head-to-head adversarial debate
/pm-debate --versus discover-users,ship-decisions Should we do more research or just ship?
```

The synthesis highlights where experts **disagree** — that's where the real insight lives.

## The 7 Domain Specialists

Each specialist is a self-contained consultant with deep knowledge of its frameworks. You can invoke them directly or let `/advise-frameworks` route you there.

| Skill | Domain | Frameworks | Examples |
|-------|--------|:----------:|----------|
| `/discover-users` | User Insights & Research | 12 | Design Thinking, JTBD, Kano Model, Empathy Map |
| `/frame-problems` | Problem Framing & Definition | 17 | 5 Whys, Double Diamond, Iceberg Model, Cynefin |
| `/generate-ideas` | Ideation & Concept Design | 14 | SCAMPER, Crazy 8s, Value Proposition Canvas, TRIZ |
| `/validate-bets` | Validation & Testing | 14 | Lean Startup MVP, A/B Testing, HEART Framework |
| `/ship-decisions` | Execution & Prioritization | 15 | RICE, MoSCoW, Shape Up, User Story Map, DACI |
| `/grow-product` | Growth & Market Strategy | 15 | AARRR, Hook Model, Blue Ocean, LTV/CAC, PMF |
| `/think-systems` | Systems Thinking & Strategy | 12 | Wardley Mapping, First Principles, Porter Five Forces |

The natural flow between domains:

```
discover-users → frame-problems → generate-ideas → validate-bets → ship-decisions → grow-product
                                                                                       ↕
                                                           think-systems (enters at any point)
```

Not every problem starts at the beginning — most teams enter mid-chain.

## What Each Skill Does

When you invoke a specialist, it:

1. **Listens** for signals about what type of uncertainty you have
2. **Recommends** 1-3 frameworks from its toolkit with reasoning
3. **Walks you through** the framework step-by-step using your real context
4. **Produces concrete outputs** — a filled-in canvas, a prioritized backlog, a test plan — not abstract advice
5. **Hands off** to another specialist when the work crosses domains

Each framework also has a detailed reference file in `PM_Frameworks/` with canonical origins, structure, practical guidance, worked examples, and common mistakes — the skills read these on demand when you ask for depth.

## Example Workflows

**"We're building but nothing moves the needle"**
```
/advise-frameworks → routes to /frame-problems (symptoms vs. root causes)
/frame-problems → applies Iceberg Model, finds structural pattern
/think-systems → maps system dynamics with Theory of Constraints
```

**"Leadership wants a growth strategy by Friday"**
```
/pm-debate Our B2B product has strong retention but no organic acquisition channel
→ 7 experts weigh in; Growth flags missing network effects, Validation questions PMF assumptions
/grow-product → deep dive on Growth Flywheel + Go-to-Market Strategy
```

**"Two PMs disagree on whether to research more or ship now"**
```
/pm-debate --versus discover-users,ship-decisions We have qualitative signal from 8 interviews but no quantitative validation — ship or research more?
→ Head-to-head debate with verdict and tradeoff analysis
```

## Repository Structure

```
.claude/skills/          # 9 skill definitions (SKILL.md files)
  advise-frameworks/     # Router — triage and recommend
  pm-debate/             # Orchestrator — multi-expert debate
  discover-users/        # Domain specialist (x7)
  frame-problems/
  generate-ideas/
  validate-bets/
  ship-decisions/
  grow-product/
  think-systems/
PM_Frameworks/           # 100 detailed framework reference files
  001_design-thinking.md
  ...
  100_pre-mortem.md
  framework_manifest.json
```

## License

This project is provided as-is for personal and team use with Claude Code.
