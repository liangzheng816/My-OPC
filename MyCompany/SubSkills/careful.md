# /careful

> Safety guardrails for destructive commands — warns (and pauses for confirmation) before `rm -rf`, `DROP TABLE`, force-push, `git reset --hard`, `kubectl delete`, and similar irreversible operations.

## Summary

Installs a session-scoped PreToolUse hook that inspects every Bash command before execution. If the command matches a known destructive pattern, the hook returns `permissionDecision: "ask"` with a warning so you can override or cancel. Common safe patterns (`rm -rf node_modules`, `.next`, `dist`, `__pycache__`, `.cache`, `build`, `.turbo`, `coverage`) are allowlisted to avoid prompt fatigue. Use when touching prod, debugging live systems, or sharing a session.

## When to use

- "Be careful — I'm about to touch prod"
- "Safety mode for this session"
- "Prod mode" / "careful mode"
- Before letting the agent run destructive cleanup, DB migrations, or force-pushes

## Sample prompts

```text
/careful
be careful — I'm pointing at the production database for the next few minutes
safety mode on, I'm debugging the live cluster
turn on careful mode, you're about to clean up a bunch of branches
prod mode — I want a confirmation before any rm -rf or kubectl delete
/careful then drop and recreate the staging schema
```

## How it works

- The hook (`bin/check-careful.sh`) reads the Bash tool's input JSON and pattern-matches against the protected list: `rm -rf|-r|--recursive`, `DROP TABLE|DATABASE`, `TRUNCATE`, `git push --force|-f`, `git reset --hard`, `git checkout .` / `restore .`, `kubectl delete`, `docker rm -f` / `system prune`.
- Allowlisted: `rm -rf` against common build/cache directories (`node_modules`, `.next`, `dist`, `__pycache__`, `.cache`, `build`, `.turbo`, `coverage`) run without warning.
- On match, you see the matched command and a one-line risk note; you can approve and continue or cancel.
- Session-scoped — ends with the conversation. To go further, use `/guard` (combines `/careful` with `/freeze` directory-scoping).

## Notes

Pairs with `/freeze` (restricts edits to a single directory) — `/guard` is the convenience bundle for max safety. The hook is allowlist-friendly: build/cache cleanup never triggers warnings.

## See also

`/freeze`, `/guard`, `/unfreeze`
