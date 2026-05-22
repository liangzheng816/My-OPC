# /devex-review

> Dogfood the live developer experience — time TTHW, screenshot errors, score every dimension with evidence.

## Summary

`/devex-review` is the "actually try the product as a new developer" audit. The agent uses the browse tool to navigate docs, run the getting-started flow, time time-to-hello-world, and screenshot what real devs see. It runs CLI `--help`, triggers error scenarios, and produces a DX scorecard with evidence per dimension. If `/plan-devex-review` ran on the plan first, this one boomerangs against those scores ("plan said 3 minutes, reality says 8").

## When to use

- User says "test the DX", "DX audit", "developer experience test", "try the onboarding", "API design review"
- After shipping a developer-facing feature (API, CLI, SDK, library, platform, docs)
- Before launch or before a docs revamp
- Voice aliases: "dx audit", "test the developer experience", "try the onboarding", "developer experience test"
- Proactively suggest after shipping a developer-facing feature

## Sample prompts

```text
/devex-review
Test the new SDK's getting started flow end-to-end.
Audit the developer experience on https://docs.myapp.com.
Try installing our CLI from a fresh machine and time it.
DX audit on the API playground — is the first 5 minutes painless?
The plan said TTHW would be under 2 min. Verify it on the live site.
```

## How it works

- Step 0 discovers targets from CLAUDE.md and README (docs URL, install command, product URL). Checks for prior `/plan-devex-review` scores as a baseline.
- Steps 1-8 are dedicated audit passes: Getting Started, API/CLI/SDK ergonomics, error messages, documentation, upgrade path, dev environment, community, and DX measurement. Each loads its hall-of-fame calibration section (Stripe, Vercel, TypeScript, etc.).
- Every score (0-10) carries evidence: TESTED (screenshot/bash output), PARTIAL, or INFERRED. Never guesses.
- Scope-honest: explicitly states what browse can't test (CLI install on a fresh machine, email verification, IDE integration) and uses bash or marks INFERRED for those.
- Time-to-hello-world is benchmarked against tiers: Champion (<2m), Competitive (2-5m), Needs Work (5-10m), Red Flag (>10m).

## Notes

The scoring rubric uses "the gap method" — for each score, the agent describes what a 10 looks like for THIS product, not in general. Pair with `/plan-devex-review` to catch DX issues before code lands.

## See also

[plan-devex-review.md](./plan-devex-review.md), [design-review.md](./design-review.md), [qa.md](./qa.md)
