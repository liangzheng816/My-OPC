# /landing-report

> Read-only dashboard showing which VERSION slots are claimed, by which open PRs, and what `/ship` would pick next.

## Summary

When you run several Conductor workspaces in parallel, multiple branches can race to claim the same VERSION number. `/landing-report` is the read-only inspector for that race: it lists open PRs on the base branch with their claimed versions, shows sibling worktrees with likely-to-ship WIP, and prints exactly which slot `/ship` would land in for micro / patch / minor / major bumps. Nothing mutates — think `gh pr list` for VERSION numbers.

## When to use

- You're running 5-10 parallel workspaces and want to see who's racing for what slot
- Before `/ship` to confirm there's no collision with another PR
- Voice/text aliases: "landing report", "version queue", "ship queue", "what version comes next", "show open PR versions"
- After a teammate opens a PR and you want to know if your branch needs to rebump

## Sample prompts

```text
/landing-report
what's in the ship queue right now?
show me the open PRs and which versions they claim
which version would /ship pick if I ran it now?
landing report — I have three workspaces racing
any collisions with PR #1152 on main?
```

## How it works

- Detects platform and base branch (`gh pr view` / `gh repo view`, falls back to `main`).
- Reads current `VERSION` from HEAD and `origin/<base>`.
- Calls `bin/gstack-next-version` four times (micro/patch/minor/major) — same util `/ship` uses, but only reading.
- Renders a single box-drawn dashboard: open PRs with claimed versions (collisions flagged), sibling Conductor worktrees with `active` markers (VERSION ahead of base + commit <24h + no PR), and the four candidate slots `/ship` would claim.
- Closes with a one-line next-action: collision warning, "rebump risk" notice, or "queue is clean".

## Notes

Always safe in plan mode — entirely read-only, no file writes or git mutations. If offline or the host (`github` / `gitlab`) can't be detected, it degrades to a short "queue-awareness unavailable" block; local VERSION bumps still work, you just lose collision detection.

## See also

`/ship`, `/land-and-deploy` — the mutating siblings that actually claim the slot and merge.
