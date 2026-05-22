# /design-consultation

> A senior designer consults with you, researches the space, and proposes a complete design system as DESIGN.md.

## Summary

`/design-consultation` is the "start a new product's design system" skill. The agent acts like a real product designer: it reads your README and codebase, optionally researches what top products in your space do, then proposes a coherent system across typography, color, layout, spacing, and motion. The output is a DESIGN.md committed to your repo as the project's design source of truth, plus font+color preview pages. It's a conversation, not a form wizard.

## When to use

- User says "design system", "brand guidelines", "create DESIGN.md", "design from scratch"
- Starting a new project's UI with no existing DESIGN.md
- Rebranding or resetting the visual identity of an existing project
- Proactively suggest at the start of a project before any meaningful UI exists
- For existing live sites where the system needs to be *inferred*, use `/plan-design-review` instead

## Sample prompts

```text
/design-consultation
Help me set up a design system for this project from scratch.
Create a DESIGN.md for this product. It's a B2B analytics dashboard.
I want to redo our brand — modern, serious, builder-energy. Walk me through it.
We just finished /office-hours. Now turn the product idea into a design system.
```

## How it works

- Phase 0 pre-checks for existing DESIGN.md and `/office-hours` artifacts; gathers product context from README, package.json, and the file tree.
- Phase 1 asks one consolidated context question (who/what/space/research preference) plus a "memorable thing" forcing question — every later design decision serves that one thing.
- Optionally uses the `gstack/design` and `gstack/browse` binaries: design generates AI mockups of the proposed system applied to real screens; browse opens comparison boards and visits competitive landscapes for research.
- All artifacts (mockups, comparison boards, approved.json) save under `~/.gstack/projects/<slug>/designs/`, not in the repo, so they persist across branches and workspaces.
- Maintains a per-project `taste-profile.json` so repeated sessions calibrate to what you've previously approved or rejected.

## Notes

Posture is "design consultant, not form wizard" — the agent proposes a complete system and explains its reasoning. Pushback is welcome and the conversation is fluid. Pair with `/design-shotgun` to explore variants and `/design-html` to turn the approved system into production HTML.

## See also

[design-shotgun.md](./design-shotgun.md), [design-html.md](./design-html.md), [design-review.md](./design-review.md)
