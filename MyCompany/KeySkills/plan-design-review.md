# /plan-design-review

> Designer's eye plan review: rates each design dimension 0-10, explains what a 10 looks like, then fixes the plan to get there.

## Summary

A senior product designer's pass over a plan before any UI code is written. The skill finds missing design decisions — empty states, hierarchy, edge cases, accessibility, responsive behavior — and adds them to the plan, so implementation lands closer to "intentional" than "AI-generated." It is the plan-mode counterpart to `/design-review`, which audits live sites.

## When to use

- A plan touches UI/UX and you want the design decisions locked in before coding.
- You want concrete 0-10 scores per dimension plus a path to a 10.
- Voice triggers: "review the design plan", "design critique", "check design decisions".
- Proactively suggest when the user has a plan with visible UI/UX components.

## Sample prompts

```text
/plan-design-review on the dashboard redesign plan
design critique on this onboarding flow before I start building
review ux plan — focus on empty states and error UX
The plan calls for a 3-column feature grid. Run a design review on it.
/plan-design-review and have the gstack designer generate mockups for the hero
check design decisions in TODOS.md before I touch React
```

## How it works

- Generates real mockups via the gstack designer (`generate`, `variants`, `compare`, `iterate`, `check`, `evolve`) instead of just describing visuals.
- Scores each dimension: empty states, hierarchy, edge cases, responsive, accessibility, AI-slop risk, trust signals.
- Applies cognitive patterns from Rams, Norman, Krug, Ive, Gebbia — taste is debuggable, traceable to a broken principle.
- Three laws of usability gate every recommendation: don't make me think; clicks don't matter, thinking does; omit then omit again.
- Output is a better plan, not a separate document.

## Notes

Sibling to [design-review](./design-review.md) (live visual QA on shipped code) and [design-consultation](./design-consultation.md) (greenfield design system creation). Use this one before the implementation lands, not after.

## See also

`/design-review`, `/design-consultation`, `/design-shotgun`, `/plan-ceo-review`
