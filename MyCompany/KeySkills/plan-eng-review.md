# /plan-eng-review

> Eng manager-mode plan review: lock in the architecture, data flow, edge cases, and test coverage before implementation starts.

## Summary

A senior engineering review pass on a plan or design doc. The skill challenges scope, audits for existing code that already solves the sub-problems, maps every error path, demands diagrams for non-trivial flows, and asks whether built-in framework features make the custom approach unnecessary. Walks issues interactively with opinionated recommendations so the architecture is locked in before any line gets written.

## When to use

- You have a plan or TODOS.md ready and you're about to start coding.
- You want a rigorous architecture pass: data flow, error handling, observability, tests, diagrams.
- Voice triggers: "review the architecture", "engineering review", "tech review", "technical review", "lock in the plan".
- Proactively suggest when the user has a plan and is about to implement.

## Sample prompts

```text
/plan-eng-review on the queue migration plan in TODOS.md
engineering review before I start coding the worker refactor
lock in the plan — I'm worried about the data flow on the bulk import path
/plan-eng-review and challenge the scope. We're touching 14 files; that smells too big.
tech review on the design doc at ~/.gstack/projects/acme/feature-design.md
Check this implementation plan against framework built-ins. Are we reinventing anything?
```

## How it works

- Step 0 is scope challenge: what existing code already solves this, what's the minimum diff, does the runtime have a built-in?
- Then a system audit (git log, TODOs, stashed work, recently-touched files) before the review proper.
- Walks the plan looking for shadow paths (nil/empty/error), edge cases, observability gaps, missing diagrams, and "while I was in there..." scope creep.
- Layer 1/2/3/EUREKA tags annotate recommendations: tried-and-true vs new-and-popular vs first-principles.
- Offers `/office-hours` first if no design doc exists; runs that skill inline if accepted.

## Notes

Pairs naturally with [plan-ceo-review](./plan-ceo-review.md) (ambition) and [plan-design-review](./plan-design-review.md) (taste) — the three together are the autoplan gauntlet. This skill values ASCII diagrams highly and treats stale diagrams as worse than no diagrams.

## See also

`/plan-ceo-review`, `/plan-design-review`, `/plan-devex-review`, `/office-hours`, `/autoplan`
