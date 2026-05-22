# /plan-devex-review

> Interactive developer experience plan review: persona, magical moments, competitive benchmarks, and TTHW scored before you ship the API.

## Summary

A developer-advocate-shaped review for plans that ship developer-facing surface area — APIs, CLIs, SDKs, libraries, docs, platforms. The skill interrogates personas, traces the journey from discover to scale, benchmarks against the gold-standard tool in the category, and forces decisions on the magical moment that makes developers tell their friends. Scores are output, not the process; the process is empathy and evidence.

## When to use

- A plan ships something developers will integrate against (API, CLI, SDK, framework, docs).
- You want a hard look at time-to-hello-world, error message quality, and escape hatches before code lands.
- Voice triggers: "DX review", "developer experience review", "devex audit", "API design review", "onboarding review".
- Proactively suggest when the plan involves any developer-facing surface.

## Sample prompts

```text
/plan-devex-review on the new public REST API plan
devex review the CLI in TODOS.md — focus on first five minutes
API design review for the webhooks redesign before we lock the schema
Run a DX review on the SDK plan. I want TTHW under 2 minutes.
/plan-devex-review in TRIAGE mode — only critical gaps, we ship Friday
onboarding review on the getting-started docs draft
```

## How it works

- Three modes: DX EXPANSION (competitive advantage, magical moments), DX POLISH (bulletproof every touchpoint), DX TRIAGE (critical gaps only).
- Scores the seven DX characteristics: usable, credible, findable, useful, valuable, accessible, desirable.
- Benchmarks TTHW (Time to Hello World): under 2 min = Champion, over 10 min = Red Flag (50-70% abandon).
- Walks per-pass through a Hall of Fame reference (Stripe, Vercel, TypeScript, Tailwind, etc.) loaded a section at a time.
- Forces persona interrogation and empathy narratives before any score is assigned.

## Notes

Sibling to [devex-review](./devex-review.md) which uses the browser to actually test the live DX — TTHW, error message screenshots, CLI help text — and can boomerang back against this plan's scores (plan said 3 min, reality says 8).

## See also

`/devex-review`, `/plan-eng-review`, `/plan-ceo-review`, `/autoplan`
