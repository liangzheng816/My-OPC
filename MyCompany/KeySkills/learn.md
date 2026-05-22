# /learn

> Manage the project's accumulated learnings: review, search, prune, export, or add by hand.

## Summary

gstack captures learnings automatically as you use other skills (`/review`, `/ship`, `/investigate` and friends log patterns, pitfalls, preferences, and architectural notes to `~/.gstack/projects/<slug>/learnings.jsonl`). `/learn` is the curation surface on top of that store. You can browse recent entries, full-text search them, prune stale or contradictory ones, export to markdown, see stats, or add a learning by hand. The skill never edits code — it only manages the wiki.

## When to use

- "Didn't we fix this before?" — search prior sessions for the same problem
- After a few weeks of usage when stale entries reference deleted files
- Voice/text aliases: "show learnings", "what have we learned", "manage project learnings", "prune stale learnings", "export learnings"
- When you want to seed CLAUDE.md with the patterns gstack has discovered

## Sample prompts

```text
/learn
/learn search auth-cookie
/learn prune
/learn export
/learn stats
what have we learned about the billing module?
add a learning: never use `git add -A` in this repo (preference, confidence 10)
```

## How it works

- **Show recent (default):** dumps the last 20 learnings grouped by type via `gstack-learnings-search --limit 20`.
- **Search:** full-text query against the JSONL store.
- **Prune:** checks each entry's `files` field with Glob; flags entries referencing deleted files as STALE and same-key opposing insights as CONFLICT; AskUserQuestion per flag to remove / keep / update.
- **Export:** formats entries as a markdown section (Patterns / Pitfalls / Preferences / Architecture) suitable for appending to CLAUDE.md.
- **Stats:** counts by type and source, dedupes by `key|type`, computes average confidence.
- **Manual add:** AskUserQuestion gathers type, key, insight, confidence, files; appends via `gstack-learnings-log`.

## Notes

HARD GATE: this skill never writes code. The learnings store is append-only — "updates" are new entries that win because they're newer. Cross-project search is opt-in (configured via `gstack-config set cross_project_learnings true`).

## See also

`/investigate`, `/review`, `/retro` — the skills that populate the learnings store automatically.
