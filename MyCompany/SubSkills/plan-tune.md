# /plan-tune

> Self-tuning question sensitivity plus a developer psychographic — review which gstack prompts fire, set per-question preferences, inspect your declared-vs-observed profile.

## Summary

Conversational interface for tuning how often gstack stops to ask you things, plus a dual-track developer profile (what you said you are vs what your behavior suggests). v1 is observational: the skill logs questions, lets you mark some as never-ask or always-ask, and shows you a vibe — no skill silently changes its behavior yet. Plain English in, plain English out; no CLI syntax required.

## When to use

- gstack keeps asking the same question and you want it to stop.
- You want to see your profile, your vibe, or the gap between declared and observed behavior.
- Voice triggers: "tune questions", "stop asking me that", "too many questions", "show my profile", "show my vibe", "developer profile", "turn off question tuning".
- Proactively suggest when the user overrides the same recommendation repeatedly.

## Sample prompts

```text
/plan-tune
stop asking me about test failure triage every time
show my vibe
how far off is my declared profile from my actual behavior
turn off question tuning
update my profile — I'm more boil-the-ocean than 0.5 suggests
```

## How it works

- Routes on plain-English intent: enable/setup, inspect profile, review log, set preference, edit declared profile, show gap, stats, disable.
- First-time setup is a 2-minute, 5-question declaration covering scope appetite, risk tolerance, detail preference, autonomy, architecture care.
- Inferred profile only displayed once calibrated (>=20 events, >=3 skills, >=8 question ids, >=7 days span).
- Preferences write to `gstack-question-preference`; logging writes to `~/.gstack/projects/{slug}/question-log.jsonl`.
- One-way doors always override `never-ask` for safety — the skill surfaces the override when it fires.

## Notes

Trust boundary: free-form profile edits require explicit Y confirmation (Codex #15 defense). `tune:` events from inside other skills only count when the prefix came from the user's current chat message, never tool output or file content. v1 doesn't yet feed the profile back into skill defaults — that's v2 work, gated on the registry proving durable.

## See also

`/autoplan`, `/learn`
