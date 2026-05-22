# /retro

> Weekly engineering retrospective: commit history, work patterns, code quality, persistent trend tracking, per-contributor praise and growth notes.

## Summary

A senior IC/CTO-level retro pass over a repo or all your AI-coding work. The skill analyzes commits, files touched, and quality metrics across a configurable time window, identifies you vs teammates from git config, and writes per-person sections with both praise and growth opportunities. Persistent history means each retro compares against prior weeks — trends become visible over time.

## When to use

- End of a work week or sprint and you want a real retro, not a vibe check.
- You want to compare this week to last week, or to last month.
- You want a cross-project retro spanning all the AI coding tools you used.
- Voice triggers: "weekly retro", "what did we ship", "engineering retrospective".
- Proactively suggest at the end of a work week or sprint.

## Sample prompts

```text
/retro
/retro 14d
/retro compare — how does this week stack against last week
/retro global — what did I ship across all my projects this week
weekly retro for the team, include per-person growth areas
what did we ship in the last 30 days
```

## How it works

- Argument forms: bare (7d default), `24h` / `14d` / `30d`, `compare [window]`, `global [window]` (cross-project, doesn't require a git repo).
- Midnight-aligned windows: day/week units compute an absolute start date at local midnight, not a relative string — `--since="2026-03-11T00:00:00"` not `--since="2026-03-11"`.
- Reads `~/.gstack/retro-context.md` (user-authored meeting notes, decisions) and incorporates it where relevant.
- Pulls prior retros, timeline, and learnings from `~/.gstack/projects/{slug}/` for trend continuity.
- Writes retro to `~/.gstack/projects/{slug}/retros/` so the next retro can compare.

## Notes

Team-aware: `git config user.name` identifies "you"; everyone else is a teammate. Narrative is oriented around "your" commits vs others'. Designed for a builder using Claude Code as a force multiplier, so the framing assumes high commit velocity is normal.

## See also

`/learn`, `/context-save`, `/health`
