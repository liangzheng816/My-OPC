# /autoplan

> Auto-review pipeline — runs CEO, design, eng, and DX review skills sequentially with auto-decisions, then surfaces only the taste calls at a final approval gate.

## Summary

Chains together the full gstack plan-review gauntlet (CEO, design, eng, devex) so you do not have to answer 15-30 intermediate questions one by one. Auto-decides routine choices using six built-in principles and only stops to ask about close calls, borderline scope, or codex disagreements. Best for builders who have a plan file ready and want one command to get a fully critiqued, ship-ready plan.

## When to use

- "Run all the reviews on this plan" / "autoplan this"
- "Make the decisions for me — I'll approve at the end"
- Voice aliases: "auto plan", "automatic review"
- Proactively suggest when the user has a plan file and is about to start the slow sequence of `/plan-ceo-review` → `/plan-eng-review` → `/plan-design-review` → `/plan-devex-review`

## Sample prompts

```text
/autoplan
autoplan plans/billing-rewrite.md
run all the plan reviews on plans/2026-q2-onboarding.md and surface only the taste calls
review this plan automatically — I trust the auto-decisions on routine stuff
auto plan review for the new admin dashboard spec
make the decisions for me on plans/checkout-v3.md, just stop me for scope tradeoffs
```

## How it works

- Reads the four review skill files from disk (CEO, design, eng, devex) and runs them sequentially against the same plan file.
- Applies six decision principles to auto-pick the recommended option on routine questions; flags taste questions, close approaches, and codex disagreements for human review.
- Writes findings into the plan file with a `## GSTACK REVIEW REPORT` block (runs, status, findings) so `/ship` and `/autoplan` reruns can see prior verdicts.
- Ends at a single approval gate where you accept, reject, or revise the surfaced decisions.

## Notes

Pairs naturally after `/office-hours` (idea → plan) and before `/ship` (plan → code). Codex disagreements are not auto-resolved; they always escalate to you.

## See also

`/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/plan-devex-review`, `/office-hours`, `/ship`
