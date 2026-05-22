# /gstack-upgrade

> Pull the latest gstack, run install-type-aware upgrade and migrations, show what's new.

## Summary

`/gstack-upgrade` updates gstack to latest. It auto-detects install type (global-git, local-git, vendored, vendored-global), fetches and resets to `origin/main`, re-runs `./setup`, runs version-bridging migration scripts, syncs any local vendored copy, and prints a 5-7 bullet "What's new" summary parsed from CHANGELOG.md. Standalone command, but also referenced inline by every other skill's preamble when `UPGRADE_AVAILABLE` shows up.

## When to use

- User says "upgrade gstack", "update gstack", "get latest version", "gstack upgrade"
- Voice aliases: "upgrade the tools", "update the tools", "gee stack upgrade", "g stack upgrade"
- Skill preamble printed `UPGRADE_AVAILABLE <old> <new>` and prompted for upgrade
- After a long pause from gstack — periodically pull improvements

## Sample prompts

```text
/gstack-upgrade
Upgrade gstack to the latest.
Update the tools, then continue with what I was doing.
Always keep gstack up to date going forward.
Gstack said an upgrade is available — go ahead and run it.
```

## How it works

- Step 1: respects `GSTACK_AUTO_UPGRADE=1` or `auto_upgrade: true` in `~/.gstack/config.yaml` and skips the question. Otherwise AskUserQuestion with 4 options: Yes / Always / Not now / Never ask again. "Not now" writes a snooze with escalating backoff (24h → 48h → 1 week).
- Step 2 detects install type by probing `.git` directories under `~/.claude/skills/gstack`, `~/.gstack/repos/gstack`, `.claude/skills/gstack`, `.agents/skills/gstack`.
- Step 4: for git installs, `git stash` (warns if anything stashed) → `git fetch` → `git reset --hard origin/main` → `./setup`. For vendored installs, fresh clone to a temp dir, swap directories with a `.bak` fallback for rollback.
- Step 4.5 handles local vendored copies: if team mode is active, removes the vendored copy and adds it to `.gitignore`. Otherwise syncs the vendored copy from the freshly-upgraded primary.
- Step 4.75 runs idempotent migration scripts in `gstack-upgrade/migrations/v*.sh`, sorted by version, only for versions newer than the previous install.
- Step 5 writes `~/.gstack/just-upgraded-from` so the next skill invocation prints "Running gstack vX.Y.Z (just updated!)". Step 6 summarizes CHANGELOG entries between old and new. Step 7 continues whatever skill the user originally invoked.

## Notes

Auto-upgrade failure during a preamble-triggered upgrade restores from `.bak` and warns. Standalone invocation with no upgrade available still checks for a stale local vendored copy and offers to sync or remove it.

## See also

[gstack.md](./gstack.md) — the browser binary that gets upgraded alongside the skills.
