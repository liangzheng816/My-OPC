# /health

> Code quality dashboard that wraps your existing tools and computes a weighted 0-10 score with trends.

## Summary

`/health` is a read-only quality dashboard. It detects (or reads from `## Health Stack` in CLAUDE.md) the project's type checker, linter, test runner, dead code detector, shell linter, and optionally GBrain — then runs each one, scores the result on a 0-10 rubric, and produces a composite score with trend tracking. It never fixes anything; the user decides what to act on. Useful for catching regressions early and for showing the team whether quality is improving over time.

## When to use

- Before/after a refactor to confirm you didn't drop the score
- Weekly cadence to track quality trend on a long-running branch
- Voice/text aliases: "health check", "code quality", "how healthy is the codebase", "run all checks", "quality score"
- Proactively suggest when the user asks "is this clean?" or wants a single number to share with the team

## Sample prompts

```text
/health
how healthy is the codebase right now?
run all the checks and give me a quality score
did my refactor improve or hurt code health?
quality dashboard for the feat/auth branch
score the repo — typecheck, lint, tests, knip, shellcheck
```

## How it works

- Reads `## Health Stack` from [CLAUDE.md](../CLAUDE.md) if present; otherwise auto-detects tools from `tsconfig.json`, `biome.json`, `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `knip`, `shellcheck`, and `gbrain`.
- Runs each tool sequentially, captures exit code + tail of output, parses error/warning counts.
- Scores six categories with fixed weights (typecheck 22%, lint 18%, tests 28%, deadcode 13%, shell 9%, GBrain 10%); skipped tools redistribute their weight proportionally.
- Appends a JSONL entry to `~/.gstack/projects/<slug>/health-history.jsonl` and renders the last five runs as a trend table.
- Closes with impact-ranked recommendations (`weight * (10 - score)`); HARD GATE prevents auto-fixing.

## Notes

The skill is explicitly a wrapper, not a replacement — it trusts whatever tools you've already configured. First run shows "no trend data yet"; trends require at least two runs.

## See also

`/review`, `/qa`, `/cso` — when you need someone to actually fix what `/health` flags.
