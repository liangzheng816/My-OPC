# /context-save

> Save the current working context — git state, decisions made, what's left — so any future session (different branch, different workspace) can resume without losing a beat.

## Summary

Captures a structured snapshot of the active session as a markdown file under `~/.gstack/projects/<slug>/checkpoints/`. Pulls git status, diff stats, and recent log; summarizes the goal, decisions made, remaining work, and notes (gotchas, tried-and-failed approaches). Files are append-only and named with a `YYYYMMDD-HHMMSS-<slug>` prefix so the order is stable across rsync, copies, and filesystem moves. A hard gate prevents this skill from modifying code.

## When to use

- "Save progress" / "save state" / "save my work"
- "Context save" before switching workspaces or branches
- Before a long meeting, EOD, or anytime you want to be able to fully reload later
- Proactively when looping on the same diagnostic — pair with reassessment

## Sample prompts

```text
/context-save
save progress on this auth refactor before I switch to the billing PR
/context-save wintermute progress
save my work — I'm heading into a meeting and want to resume in a new workspace
context save: half-done with the migration, decisions in store/migrations/README
/context-save list
/context-save list --all
```

## How it works

- Step 1 gathers git state (`status --short`, `diff --stat`, `log --oneline -10`). Step 2 summarizes the working context using conversation history (title, summary, decisions, remaining work, notes).
- Step 3 tries to compute session duration from `_TEL_START` or PPID start time; omits the field if unknown.
- Step 4 writes the file. Title is bash-sanitized via allowlist (`a-z 0-9 - .`, capped at 60 chars) to block shell injection from user-supplied titles. Filename collisions append a random 4-char suffix — files are never overwritten.
- File frontmatter includes `status`, `branch`, `timestamp`, optional `session_duration_s`, and `files_modified` (from `git status --short`).
- `list` mode shows current-branch saves by default; `list --all` shows every branch with an extra Branch column.

## Notes

Renamed from `/checkpoint` after Claude Code claimed that alias for native rewind. The on-disk directory is still `checkpoints/` for backward compatibility — users never see that path. Pairs directly with `/context-restore`.

## See also

`/context-restore`, `/learn`, `/retro`
