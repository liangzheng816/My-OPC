# /context-restore

> Load the most recent context saved by `/context-save` so a new session can pick up where the last one stopped — across branches and Conductor workspaces.

## Summary

Reads the saved context files written by `/context-save` (from `~/.gstack/projects/<slug>/checkpoints/`), shows you the summary, decisions made, and remaining work, then offers to start on the next item. By default it loads the most recent save across *all* branches — that is the whole point: cross-branch and cross-workspace handoff. A hard gate prevents this skill from touching code; it only reads and presents.

## When to use

- "Resume" / "where was I?"
- "Pick up where I left off"
- "Restore context" / "context restore"
- Starting a new Conductor workspace after handing off from another
- After a session compaction or restart

## Sample prompts

```text
/context-restore
where was I? Pick up the last save
resume — I just opened a new workspace
/context-restore auth-refactor
restore the most recent context, then start on the first remaining work item
context restore — I had something half-done on this repo yesterday
/context-restore 2
```

## How it works

- Reads `~/.gstack/projects/<slug>/checkpoints/*.md`, sorted by filename `YYYYMMDD-HHMMSS` prefix (stable, not filesystem mtime). Capped at the 20 most recent candidates.
- With no argument: loads the newest file across all branches. With a number or title fragment: matches against the candidate list.
- Presents a structured summary (title, branch, timestamp, duration, status, summary, remaining work, notes). Warns if the saved branch differs from the current branch.
- Closes with an AskUserQuestion offering three paths: continue on the first remaining item, show the full saved file, or just acknowledge.

## Notes

Renamed from `/checkpoint resume` because Claude Code claimed `/checkpoint` as a native rewind alias. Listing lives on the save side — use `/context-save list` (or `--all`) to browse. The cross-branch default is intentional and load-bearing for Conductor handoff.

## See also

`/context-save`, `/learn`
