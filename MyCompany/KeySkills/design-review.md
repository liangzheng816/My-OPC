# /design-review

> Designer's-eye QA on a live site, then fix what it finds — atomic commits, before/after screenshots.

## Summary

`/design-review` audits a running site (staging, prod, localhost) the way a senior designer would: visual inconsistency, spacing, hierarchy, AI-slop patterns, slow interactions. Unlike `/plan-design-review` which critiques plans before code, this one operates on the live thing and **iteratively fixes** issues in source, committing each fix atomically with before/after screenshot evidence.

## When to use

- User says "audit the design", "visual QA", "check if it looks good", "design polish", "this looks off"
- After deploying or before shipping a feature that has UI surface
- Proactively suggest when the user mentions visual inconsistencies or wants polish on a live site
- On a feature branch with no URL given, the skill auto-enters **diff-aware mode** and reviews only what changed

## Sample prompts

```text
/design-review https://staging.myapp.com
The settings page looks crowded — can you audit and fix it?
/design-review --quick on http://localhost:3000
Run a design review on the live site, focus on the dashboard.
Visual QA the pricing page, sign in as test@example.com first.
PR #423 deployed to staging — review the new onboarding flow and fix what's off.
```

## How it works

- Parses target URL, scope, depth (`--quick`, default, `--deep`), and auth from the request. Requires a clean working tree so each fix lands as its own atomic commit.
- Reads `DESIGN.md` if present — deviations from the project's stated system are higher severity. If no DESIGN.md, uses universal design principles and can offer to create one.
- Bootstraps a test framework if the project lacks one (vitest/jest/rspec/pytest/etc.) so visual fixes can be regression-tested.
- Loop: audit page → identify issues → fix in source → re-screenshot → diff → commit. Each fix carries before/after PNG evidence.
- Uses the `gstack/browse` headless browser. If `CDP_MODE=true` (connected to your real browser), it reuses your existing cookies and auth.

## Notes

For pre-implementation plan review, use `/plan-design-review` instead — that one critiques the plan file, this one critiques the running app. Pair with `/design-consultation` upstream so the review has a DESIGN.md to calibrate against.

## See also

[design-consultation.md](./design-consultation.md), [design-html.md](./design-html.md), [qa.md](./qa.md)
