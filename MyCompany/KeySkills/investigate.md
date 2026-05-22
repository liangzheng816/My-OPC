# /investigate

> Systematic debugging with a four-phase workflow and one Iron Law: no fixes without root cause.

## Summary

`/investigate` is gstack's debugging protocol. It forces a disciplined sequence — investigate, analyze (pattern match), hypothesize, implement, verify — and refuses to apply a fix until the root cause is confirmed. The goal is to stop whack-a-mole debugging where each "fix" reveals a new problem. Use it whenever something is broken, especially regressions, intermittent bugs, and 500s where the obvious patch would just paper over the actual cause.

## When to use

- A stack trace, 500 error, or unexpected behavior just landed in your lap
- "It was working yesterday" — regressions where the root cause is hiding in recent commits
- Voice/text aliases: "debug this", "fix this bug", "why is this broken", "investigate this error", "root cause analysis"
- Proactively invoke (do NOT debug directly) when the user reports errors, stack traces, or troubleshooting language

## Sample prompts

```text
/investigate the auth callback is throwing a 500 on PR #123 staging
debug this — users on Safari see a white screen after login
why is /api/checkout returning 502 intermittently? logs attached
it was working yesterday — now `bun test` fails on src/queue.test.ts
root cause analysis: the daily cron job stopped firing last Tuesday
investigate this stack trace
```

## How it works

- **Phase 1 (Investigate):** collect symptoms, read the code path, check recent `git log` for the affected files, attempt reproduction.
- **Phase 2 (Analyze):** pattern-match against a table of common bug shapes (race condition, null propagation, state corruption, integration failure, configuration drift, stale cache). Optional WebSearch on sanitized error text.
- **Phase 3 (Hypothesize):** add temporary instrumentation, verify the hypothesis. 3-strike rule — after 3 failed hypotheses, STOP and escalate via AskUserQuestion.
- **Phase 4 (Implement):** minimal-diff fix + a regression test that fails before and passes after. Flags blast radius if >5 files touched.
- **Phase 5 (Verify):** reproduce the original scenario, run the full test suite, emit a structured DEBUG REPORT and log the investigation to learnings.

## Notes

Auto-locks edits to the narrowest directory containing the bug (via the `/freeze` hook) so scope creep is mechanically prevented. Searches prior learnings keyed to a hypothesis noun (e.g. `auth-cookie`) so repeat bugs surface their old fixes.

## See also

`/review`, `/qa`, `/freeze`, `/learn` — sibling skills for pre-landing diff review, behavioral testing, scope locking, and inspecting prior investigations.
