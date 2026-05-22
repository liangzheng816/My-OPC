# /benchmark

> Performance regression detection — baselines page load times, Core Web Vitals, and bundle sizes via the browse daemon, then compares before/after on every PR.

## Summary

Measures real performance against `performance.getEntries()` data from a running page: TTFB, FCP, LCP, DOM timings, JS/CSS bundle sizes, and request counts. Captures a baseline before a change, then re-runs after to detect regressions against thresholds (a >50% timing jump or >25% bundle growth flags as REGRESSION). For builders who would rather catch the slow accretion of 50ms-here, 20KB-there before the app hits 8-second loads.

## When to use

- "Did my PR slow down the homepage?"
- "Check page speed on the staging URL"
- "Baseline the dashboard before I refactor it"
- Slash triggers: `/benchmark <url>`, `/benchmark <url> --baseline`, `/benchmark --diff`, `/benchmark --trend`
- Voice aliases: "speed test", "check performance"

## Sample prompts

```text
/benchmark https://staging.acme.com
/benchmark https://acme.com --baseline
benchmark the staging URL and tell me if PR #423 regressed LCP
/benchmark https://app.acme.com --pages /,/dashboard,/settings
check page speed on https://acme.com — bundle just jumped after the npm upgrade
/benchmark --diff
/benchmark --trend
```

## How it works

- Uses the gstack browse daemon (`$B perf`, `$B eval`) to gather navigation timing, paint entries, and resource breakdowns from the live page.
- Writes baselines to `.gstack/benchmark-reports/baselines/baseline.json`; comparisons go to `.gstack/benchmark-reports/{date}-benchmark.md` and `.json`.
- Flags regressions with relative thresholds (timing >50% or >500ms, bundles >25%, requests >30%); third-party scripts are called out but de-prioritized in recommendations.
- Supports `--diff` (only pages touched by the current branch), `--trend` (historical comparison across saved baselines), and `--quick` (one-shot, no baseline needed).

## Notes

Distinct from `/benchmark-models`, which compares AI models on the same prompt. This skill is web-perf only. Read-only by default — it produces a report; it does not modify code.

## See also

`/benchmark-models`, `/canary`, `/qa`, `/browse`
