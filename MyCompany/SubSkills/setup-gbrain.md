# /setup-gbrain

> One-command onboarding so this coding agent can call gbrain as both CLI and MCP.

## Summary

Installs and configures [gbrain](https://github.com/garrytan/gbrain), Garry Tan's persistent knowledge base, for the local Mac and registers it as an MCP server for Claude Code. Picks a storage path (PGLite local, Supabase auto-provisioned, Supabase BYO URL, or remote MCP), runs `gbrain doctor`, sets a per-repo trust policy, optionally wires in artifacts sync, and writes a `## GBrain Configuration` block to CLAUDE.md. Designed to take a user from zero to "gbrain is running and this agent knows how to use it" in one shot.

## When to use

- "setup gbrain", "install gbrain", "connect gbrain", "start gbrain"
- "configure gbrain for this machine"
- Bootstrapping a new Mac after a `gbrain search` or `code-def` call failed
- Migrating between PGLite and Supabase (`/setup-gbrain --switch`)
- Adjusting the per-repo trust policy without redoing setup (`/setup-gbrain --repo`)
- Cleaning up half-provisioned Supabase projects (`/setup-gbrain --cleanup-orphans`)

## Sample prompts

```text
/setup-gbrain
install gbrain on this Mac and register it with Claude Code
connect gbrain — I want a shared team brain on Supabase
/setup-gbrain --repo
my coworker is already running gbrain serve at https://brain.acme.dev — wire me up
/setup-gbrain --switch (move from PGLite to Supabase)
/setup-gbrain --cleanup-orphans
```

## How it works

- Step 1 probes current state via `gstack-gbrain-detect`; skips anything already done
- Step 2 picks a path: Supabase (existing URL), Supabase (auto-provision via PAT), Supabase (manual), PGLite local, or Remote gbrain MCP (HTTP + bearer)
- Step 3-4 installs the CLI (skipped for remote MCP) and initializes the brain via env-var secret handoff, never argv
- Step 5a registers gbrain with `claude mcp add` so this agent can call it as a tool
- Step 6 captures per-repo trust policy (allow / deny / ask); Step 7 optionally enables artifacts sync to a private GitHub repo
- Step 7.5 offers transcript and `~/.gstack/` memory ingest; Steps 8-10 write CLAUDE.md, smoke-test search, and print a GREEN/YELLOW/RED verdict block

## Notes

- Scope honesty: the MCP registration step targets Claude Code specifically. Cursor, Codex CLI, and other hosts still get the CLI on PATH but need to register `gbrain serve` themselves.
- Audience: local-Mac. OpenClaw/Hermes cloud agents typically run their own gbrain; sharing across them and local Claude Code requires Supabase.
- Trust-surface warning on Supabase URL paste: pasting a shared pooler URL grants this local agent every page the cloud agent can see. PGLite keeps things disjoint.
- Path 4 (Remote MCP) skips local install, doctor, and transcript ingest — the brain host owns those.

## See also

`/sync-gbrain` — keep gbrain current after setup; pair as setup-then-sync.
