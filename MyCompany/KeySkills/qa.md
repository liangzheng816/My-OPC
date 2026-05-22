# /qa

> Test, fix, and re-verify a web app: drive the browser like a real user, find bugs, fix them in source with atomic commits, produce before/after health scores.

## Summary

End-to-end QA loop. The skill drives a real browser through the app, documents bugs with screenshots and repro steps, then iteratively fixes each bug in source code with an atomic commit per fix and a re-verification pass. Output is a before/after health score and a ship-readiness summary. Diff-aware by default — on a feature branch with no URL, it auto-scopes to pages affected by the branch.

## When to use

- A feature is ready for testing and you want to know whether it actually works.
- You want bugs found AND fixed, not just reported.
- Voice triggers: "qa", "test this site", "find bugs", "test and fix", "quality check", "test the app", "run QA".
- Proactively suggest when the user asks "does this work?" or says something is ready to ship.

## Sample prompts

```text
/qa http://localhost:3000 — focus on the new checkout flow
The staging URL is https://staging.acme.com. Run QA and fix what's broken.
/qa --quick on the dashboard — just critical and high
test and fix the billing page, sign in to qa@example.com
qa — I just pushed the redesign branch, find any regressions
/qa --exhaustive before I ship. I want even the cosmetic stuff fixed.
```

## How it works

- Three tiers: Quick (fixes critical + high), Standard (+ medium, default), Exhaustive (+ low/cosmetic).
- Requires a clean working tree — offers to commit or stash dirty changes before starting.
- Diff-aware mode (automatic on feature branch with no URL): reads branch diff, identifies affected routes, tests each.
- Per-bug evidence tier: interactive bugs get before/after screenshots and `snapshot -D` diffs; static bugs get one annotated screenshot.
- Health score weighted across console, links, visual, functional, UX, performance, content, accessibility — produces a `baseline.json` for regression mode.
- Writes report to `.gstack/qa-reports/qa-report-{domain}-{date}.md`.

## Notes

The fix loop is the differentiator from [qa-only](./qa-only.md). Each fix is its own atomic commit so the bisect history stays clean. Bootstraps a test framework if none is detected. CDP mode (real Chrome via `/connect-chrome`) skips cookie-import prompts since real auth sessions are already present.

## See also

`/qa-only`, `/investigate`, `/review`, `/connect-chrome`, `/setup-browser-cookies`
