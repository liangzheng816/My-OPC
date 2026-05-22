# /qa-only

> Report-only QA: drive the browser, document bugs with screenshots and repro steps, produce a health score — but never touch source code.

## Summary

The read-only sibling of `/qa`. The skill systematically tests a web application, documents 5-10 well-evidenced issues per session, scores health across eight weighted categories, and writes a structured report. It never reads source code, never edits files, never suggests fixes in the report. Useful when you want a bug report on someone else's code, a baseline snapshot, or a clean test pass before deciding what to fix.

## When to use

- You want a bug report without any code changes — for triage, handoff, or review.
- You're testing code you don't own or shouldn't modify.
- Voice triggers: "qa report only", "just report bugs", "test but don't fix", "bug report", "just check for bugs".
- Proactively suggest when the user wants findings without remediation.

## Sample prompts

```text
/qa-only https://staging.acme.com — full pass, I want a report for the team
just report bugs on the new checkout page, I'll triage later
qa report only — sign in to demo@example.com, focus on the dashboard
test but don't fix the billing flow on http://localhost:3000
/qa-only --quick on the marketing site, send me the screenshot folder
bug report on the staging URL before we promote to prod
```

## How it works

- Three modes: Full (default, 5-15 minutes, 5-10 documented issues), Quick (30-second smoke test), Regression (diff against a prior `baseline.json`).
- Same diff-aware auto-mode as `/qa`: on a feature branch with no URL, scopes to changed routes.
- Two evidence tiers: interactive bugs (before/after screenshots, `snapshot -D` diffs) vs static bugs (single annotated screenshot).
- Health score across console, links, visual, functional, UX, performance, content, accessibility — weighted, 0-100.
- Writes report to `.gstack/qa-reports/qa-report-{domain}-{date}.md` plus `baseline.json` for regression diffs.
- Framework-aware guidance for Next.js (hydration), Rails (CSRF, N+1), WordPress (plugin conflicts), generic SPAs.

## Notes

Hard rule: never reads source, never edits, never suggests fixes in the report. If you want the test-fix-verify loop, use [qa](./qa.md) instead. Credentials always written as `[REDACTED]` in repro steps. When no test framework is detected, the report nudges the user toward `/qa` to bootstrap one.

## See also

`/qa`, `/review`, `/investigate`, `/setup-browser-cookies`
