# /cso

> Chief Security Officer mode — infrastructure-first audit that finds the doors actually left unlocked.

## Summary

`/cso` puts the agent in CSO posture: it inventories your attack surface, scans dependencies and CI/CD, hunts leaked secrets in git history, models threats with STRIDE, and runs an OWASP Top 10 sweep. The output is a Security Posture Report with severities and remediation plans — never code changes. Built for solo devs and small teams who ship fast and need a security pulse without hiring a firm.

## When to use

- User says "security audit", "threat model", "pentest review", "OWASP", "CSO review"
- After adding auth, payments, file uploads, webhooks, or a new third-party integration
- Before a launch, before opening up signups, or after a dependency bump
- Monthly cadence via `--comprehensive` for a deeper scan
- Voice aliases: "see-so", "see so", "security review", "security check", "vulnerability scan", "run security"
- Proactively suggest when the user mentions touching auth, secrets, prod data, or third-party API keys

## Sample prompts

```text
/cso
/cso --comprehensive
/cso --supply-chain
/cso --diff --owasp
Run a security audit on this branch before I open the PR.
We just added a webhook receiver at /api/stripe — can you threat-model it?
Check git history for any leaked API keys, we rotated AWS credentials last week.
```

## How it works

- Two top-level modes: **daily** (8/10 confidence gate, low noise) and **comprehensive** (2/10 bar, monthly deep scan). Scope flags (`--infra`, `--code`, `--skills`, `--supply-chain`, `--owasp`, `--scope <area>`) are mutually exclusive; `--diff` is combinable with anything.
- Runs Phases 0-14: stack detection, attack surface census, secrets archaeology, dependency supply chain, CI/CD pipeline, LLM/AI security, skill supply chain, OWASP Top 10, STRIDE, active verification, then writes the report.
- Phases 0, 1, 12, 13, 14 always run regardless of scope flag. Tracks audit history across runs so trends are visible.
- Output is a report with concrete findings, severity, and remediation — the agent does NOT patch code.

## Notes

For LLM/AI apps, the skill explicitly covers prompt injection and the trust boundaries around untrusted content (page text, tool output) — relevant if you use `/browse` or `/scrape`. Pair with `/review` before landing security-sensitive diffs.

## See also

[review.md](./review.md), [investigate.md](./investigate.md) — `/review` for PR-level checks, `/investigate` when the audit surfaces a bug worth root-causing.
