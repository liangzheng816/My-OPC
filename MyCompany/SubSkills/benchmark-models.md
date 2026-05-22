# /benchmark-models

> Cross-model AI shootout — runs the same prompt through Claude, GPT (via Codex), and Gemini, then compares latency, cost, tokens, and optionally quality.

## Summary

Wraps the `gstack-model-benchmark` binary in an interactive flow: pick a prompt (an existing gstack skill, an inline string, or a file), confirm which providers are authed, optionally enable a Claude-judged quality score, and run them side-by-side. Answers "which model is actually best for this skill?" with numbers instead of vibes. Different from `/benchmark`, which measures web page performance.

## When to use

- "Which model is best at /qa?" / "Should I run /investigate on Claude or GPT?"
- "Benchmark this prompt across models"
- "Compare claude, gpt, and gemini on the same task"
- Voice aliases: "compare models", "model shootout", "which model is best"

## Sample prompts

```text
/benchmark-models
benchmark-models on the /office-hours skill — which one writes the best YC questions?
compare claude, gpt, and gemini on this prompt: "refactor this auth.ts to use a state machine"
which model should I use for code review? Run them against the same diff
model shootout for /design-review — judge enabled
benchmark the /plan-eng-review skill across all three providers and save results
```

## How it works

- Step 0 locates the `gstack-model-benchmark` binary in `~/.claude/skills/gstack/bin/`.
- Step 1 picks the prompt: a gstack skill's SKILL.md, an inline string via `--prompt`, or a file path.
- Step 2 runs a `--dry-run` first to show auth status per provider; unauthed providers are skipped cleanly, not fatal.
- Step 3 optionally enables `--judge` (Claude scores each output 0-10; adds about $0.05/run).
- Step 4 streams results — expect 30s to 5min depending on prompt and judge mode. Step 5 summarizes fastest, cheapest, highest quality. Step 6 offers to save JSON to `~/.gstack/benchmarks/<date>-<slug>.json` for trend tracking.

## Notes

The skill refuses to run if zero providers are authed — there is nothing to compare. Cost is always visible in the output table so you see what each run spent before deciding to re-run.

## See also

`/benchmark`, `/codex`, `/plan-tune`
