# /canary

> Post-deploy production watch — screenshots, console errors, and load times every minute, comparing against a pre-deploy baseline so regressions surface in the first 10 minutes.

## Summary

A release-reliability safety net that uses the browse daemon to monitor a live URL for a configurable window after a deploy. Captures a baseline before shipping, then re-checks key pages every 60 seconds for the chosen duration, alerting on new console errors, broken navigation, or load times above 2x baseline. Catches the things CI does not: missing env vars, stale CDN assets, slow migrations on real data.

## When to use

- "Watch production for 10 minutes after I merge this"
- "Canary the staging deploy"
- "Verify the deploy is healthy" / "post-deploy check"
- Slash arguments: `/canary <url>`, `--baseline`, `--duration 5m`, `--pages /,/dashboard`, `--quick`
- Proactively useful after `/ship` or `/land-and-deploy` completes.

## Sample prompts

```text
/canary https://acme.com --baseline
about to deploy — capture canary baseline on https://acme.com for /, /dashboard, /settings
/canary https://acme.com --duration 15m
watch https://acme.com for 10 minutes, alert me if anything regresses
post-deploy check on https://staging.acme.com — quick health pass only
/canary https://acme.com --pages /,/api/health --quick
PR #512 just merged and deployed. Monitor https://app.acme.com for new console errors.
```

## How it works

- Phase 1 sets up `.gstack/canary-reports/`. Phase 2 (with `--baseline`) captures screenshots, console error counts, and `perf` timings before deploy.
- Auto-discovers pages from navigation links, or uses `--pages`. Continuously loops every 60s through Phase 5: `goto`, `snapshot -i -a`, `console --errors`, `perf`.
- Alerts on changes against baseline (new errors, 2x load time, broken navigation), with a 2-consecutive-check threshold to avoid false positives from transient network blips.
- Severity tiers: CRITICAL (page won't load), HIGH (new errors), MEDIUM (perf regression), LOW (new 404s). Critical/high alerts trigger an AskUserQuestion with options: investigate now, keep watching, rollback, dismiss.
- Phase 6 writes the report to `.gstack/canary-reports/{date}-canary.{md,json}` and logs a JSONL entry for dashboards. Phase 7 offers to roll the baseline forward if the deploy was healthy.

## Notes

Read-only by design — alerts and reports, no fixes. Use `/investigate` if a canary alert needs a root-cause dig. Pairs with `/setup-deploy` if you want `/land-and-deploy` to auto-canary after merges.

## See also

`/ship`, `/land-and-deploy`, `/investigate`, `/benchmark`, `/browse`, `/setup-deploy`
