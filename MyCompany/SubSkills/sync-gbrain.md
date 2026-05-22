# /sync-gbrain

> Keep gbrain current with this repo's code and refresh CLAUDE.md search guidance.

## Summary

The "refresh the brain" verb for repos that have already run `/setup-gbrain`. Wraps the `gstack-gbrain-sync` orchestrator with state probing, native code-surface registration (`gbrain sources add`, `sync --strategy code`, `code-def`/`code-refs`/`code-callers`), a write-and-search capability check, and a verdict block. It also rewrites the `## GBrain Search Guidance` block in CLAUDE.md so the agent knows when to prefer `gbrain` over Grep — and removes that block on machines where the local CLI is missing, so agents don't get told to use tools that aren't installed.

## When to use

- "sync gbrain", "refresh gbrain", "reindex repo", "update gbrain"
- "gbrain search isn't finding things"
- After meaningful code changes (new files, big refactors, branch switch)
- When a sibling Conductor worktree was just synced and this one shows the unpinned warning
- Voice triggers: sync gbrain, refresh gbrain, reindex repo, update gbrain

## Sample prompts

```text
/sync-gbrain
/sync-gbrain --full
refresh gbrain — I just merged a 200-file refactor
gbrain search isn't finding the new TodoController, reindex this repo
/sync-gbrain --code-only --quiet
/sync-gbrain --dry-run to preview what would change
```

## How it works

- Step 1 probes via `gstack-gbrain-detect`; blocks if `/setup-gbrain` was never run or the per-repo policy is `deny`
- Step 2 runs three stages through the orchestrator: code → memory → brain-sync (each non-fatal; state persisted via atomic rename; concurrent runs blocked by `~/.gstack/.sync-gbrain.lock`)
- Step 3 health-checks the cwd source's `page_count`; if zero and not already a full pass, offers `--full --code-only` (~25-35 min on a big repo)
- Step 4 round-trips a `gbrain put`/`gbrain search` capability check, then writes or removes the `## GBrain Search Guidance` block in CLAUDE.md atomically
- Step 5 prints a GREEN/YELLOW/RED verdict block (CLI, engine, capability, cwd source, ~/.gstack source, memory sync, CLAUDE.md, last sync)

## Notes

- Split-engine model: code lookups stay local + worktree-scoped (kubectl-style `.gbrain-source` pin in repo root), artifacts/memory route through whatever `/setup-gbrain` configured (including remote-MCP).
- Each Conductor sibling worktree gets its own pin and its own indexed pages, so semantic results match the code actually on disk.
- For ongoing auto-sync across all worktrees, run `gbrain autopilot --install` once per machine.
- Argument modes: default (incremental, ~50ms), `--full`, `--code-only`, `--dry-run`, `--no-memory`, `--no-brain-sync`, `--quiet`.

## See also

`/setup-gbrain` — run once before `/sync-gbrain` can do anything; setup is install, sync is refresh.
