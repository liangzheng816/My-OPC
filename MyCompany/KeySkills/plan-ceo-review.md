# /plan-ceo-review

> CEO/founder-mode plan review: rethink the problem, find the 10-star product, and challenge premises before any code gets written.

## Summary

A founder-shaped review pass over a plan or design doc. The skill takes a posture (cathedral builder, surgeon, or rigorous reviewer) and walks the plan looking for scope it should grow into, scope it should shed, or assumptions worth re-examining. It runs in plan mode, never edits implementation code, and routes every scope change through an explicit AskUserQuestion so the user owns each opt-in.

## When to use

- You have a plan or design doc and want to pressure-test the ambition before locking in.
- The plan smells like it could think bigger, or conversely, looks bloated.
- Voice triggers: "think bigger", "expand scope", "strategy review", "rethink this", "is this ambitious enough".
- Proactively suggest when the user is questioning scope or feels the plan is too safe.

## Sample prompts

```text
/plan-ceo-review on the new billing redesign plan in ~/.gstack/projects/acme/billing-design-2026-05-12.md
Is this plan ambitious enough? It feels like we're shipping a 4-star product, not a 10-star one.
think bigger about the onboarding flow we just speced
/plan-ceo-review — but hold scope and just stress-test the failure modes
rethink this — what would Stripe do if they were shipping this checkout?
strategy review on TODOS.md before I start coding tomorrow
```

## How it works

- Four modes selected up front: SCOPE EXPANSION (cathedral), SELECTIVE EXPANSION (hold + cherry-pick), HOLD SCOPE (max rigor), SCOPE REDUCTION (surgeon).
- Runs a system audit first: git history, TODOs, existing design docs, prior `~/.gstack/projects/{slug}/ceo-plans/` artifacts.
- Drives an interactive walk of the plan: error/rescue map, failure modes, observability, diagrams, edge cases — every scope change is its own AskUserQuestion opt-in.
- Pulls on cognitive patterns from Bezos, Grove, Munger, Jobs, Horowitz, Altman, etc. — internalized, not enumerated.
- Optional handoff to `/office-hours` first if no design doc exists.

## Notes

Pairs with [autoplan](./autoplan.md) for the full review gauntlet. `benefits-from: [office-hours]` in the frontmatter — the skill explicitly recognizes office-hours as a sharper input. Sibling to `/plan-eng-review` (architecture) and `/plan-design-review` (UX taste) — CEO sits above both on ambition.

## See also

`/office-hours`, `/plan-eng-review`, `/plan-design-review`, `/autoplan`
