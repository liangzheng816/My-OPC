# /office-hours

> YC-style office hours for product ideas — six forcing questions in startup mode, design-thinking brainstorm in builder mode.

## Summary

`/office-hours` is gstack's pre-code thinking surface. In **startup mode** it runs YC's six forcing questions (demand reality, status quo, desperate specificity, narrowest wedge, observation & surprise, future-fit) with an anti-sycophancy posture — it pushes back. In **builder mode** it shifts to design-partner brainstorming for hackathons, side projects, learning, and open source. Either way it produces a saved design doc with problem statement, alternatives, recommended approach, open questions, and success criteria, ready to feed into `/plan-ceo-review` or `/plan-eng-review`.

## When to use

- You have an idea and want to know if it's worth building before you write code
- Brainstorming a side project, hackathon, or learning project
- Voice/text aliases: "brainstorm this", "I have an idea", "help me think through this", "office hours", "is this worth building"
- Proactively invoke (do NOT answer directly) when the user describes a new product idea, asks whether something is worth building, or is exploring a concept before any code exists

## Sample prompts

```text
/office-hours
I have an idea for a tool that lints AI agent prompts — is this worth building?
office hours — help me think through a side project for the weekend hackathon
brainstorm this: a CLI that watches your git stash and auto-reminds you
is there real demand for a Postgres-only feature flag service?
help me think through whether to ship this as a library or a SaaS
I want to build something with the new MCP spec but I don't know what
```

## How it works

- **Phase 1 (Context):** loads prior sessions, learnings, and decides startup vs builder mode.
- **Phase 2A (Startup):** asks the six forcing questions one at a time with explicit anti-sycophancy rules and concrete pushback patterns when answers are vague.
- **Phase 2B (Builder):** generative, less interrogative — design thinking instead of demand testing.
- **Phases 2.5-3 (Discovery + Premise Challenge):** related-design search, landscape awareness via WebSearch, premise challenges, optional cross-model second opinion via codex.
- **Phase 4 (Alternatives):** generates 2-3 distinct approaches with tradeoffs; mandatory, not optional.
- **Phase 5 (Design Doc):** writes a structured markdown design doc (problem, demand evidence, narrowest wedge, premises, approaches, recommendation, open questions, success criteria, distribution plan).
- **Phase 6 (Handoff):** tier-aware closing — introduction / welcome_back / regular / inner_circle based on session count; logs a builder profile.

## Notes

The skill is explicitly modeled on the YC partner posture — directness over politeness. If you want a yes-man, this is the wrong skill. Hand the resulting design doc to `/plan-ceo-review` for scope expansion or `/plan-eng-review` to lock in architecture.

## See also

`/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/autoplan` — the downstream skills that take an office-hours doc into execution-ready territory.
