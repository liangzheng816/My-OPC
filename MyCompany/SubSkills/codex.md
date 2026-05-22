# /codex

> OpenAI Codex CLI wrapper — independent diff review, adversarial challenge mode, or general consult with session continuity. The "200 IQ autistic developer" second opinion.

## Summary

Three modes wrapping the OpenAI Codex CLI for second-opinion work. Review mode does an independent pass on the current diff against the base branch with a pass/fail gate. Challenge mode is adversarial — it tries to break your code by hunting edge cases, race conditions, and assumptions. Consult mode is open-ended Q&A with session continuity so follow-up questions remember context. Useful when you want a different model's take before merging or shipping.

## When to use

- "Get a second opinion on this PR" / "codex review the diff"
- "Try to break this code" / "adversarial review"
- "Ask codex about X" / "consult codex on this design"
- Voice aliases: "code x", "code ex", "get another opinion"

## Sample prompts

```text
/codex review
/codex review focus on security
codex challenge — try to break the new payment retry logic
/codex challenge concurrency in worker.ts
ask codex: is there a simpler way to model this state machine than what I have in store.ts?
/codex consult — what are the tradeoffs between optimistic locking and event sourcing for this billing flow?
codex review --xhigh for maximum reasoning before I land PR #487
```

## How it works

- Review mode: `codex review --base <base-branch>` runs against the current diff with a hardened prompt that prevents codex from reading `.claude/skills/` files. Outputs a pass/fail verdict appended to the plan file as a `## GSTACK REVIEW REPORT` row.
- Challenge mode: feeds codex an adversarial prompt that asks it to hunt for failures, not approve the design. Optional focus argument narrows scope (e.g., `security`, `concurrency`).
- Consult mode: open Q&A that keeps a session ID so `/codex` follow-ups in the same conversation share context.
- Model and reasoning effort are configurable: `--xhigh` for highest reasoning, `-m gpt-5.1-codex-max` to pin a specific model. Default timeout is 330 seconds per run.

## Notes

A core building block of `/autoplan` and `/ship`'s review gates — those skills call `/codex review` automatically. The hardened prompt boundary is load-bearing: without it, codex tries to read claude skill files and contaminates the review.

## See also

`/review`, `/autoplan`, `/plan-eng-review`, `/ship`
