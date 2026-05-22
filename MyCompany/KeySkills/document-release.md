# /document-release

> Post-ship docs sync — reads the diff, updates README/ARCHITECTURE/CONTRIBUTING/CLAUDE.md, polishes CHANGELOG voice.

## Summary

`/document-release` runs after `/ship` (PR exists) but before merge. It cross-references every documentation file in the repo against the diff, makes obvious factual updates directly, asks about subjective or risky changes, polishes CHANGELOG wording without rewriting entries, marks TODOS complete, and optionally bumps VERSION. Mostly automated; stops only for taste calls.

## When to use

- User says "update the docs", "sync documentation", "post-ship docs"
- After `/ship` creates the PR, before it merges
- Proactively suggest after a PR is merged or code is shipped
- Triggers: "update docs after ship", "document what changed", "post-ship docs"

## Sample prompts

```text
/document-release
Update the docs for the changes on this branch.
PR #142 is ready — sync README and CHANGELOG before I merge it.
We added the /freeze skill. Update CLAUDE.md and the skills table in README.
Post-ship docs sweep — check if ARCHITECTURE.md still matches reality.
```

## How it works

- Step 1 aborts if you're on the base branch. Otherwise gathers diff stats, commit log, and discovers all `*.md` docs.
- Step 2 audits each file against the diff using generic heuristics (README features, ARCHITECTURE diagrams, CONTRIBUTING smoke test, CLAUDE.md project structure). Classifies updates as auto-update or ask-user.
- Step 3 applies factual updates directly via Edit. Step 4 uses AskUserQuestion for narrative or risky changes.
- Step 5 polishes CHANGELOG voice (sell test: "would a user want to try this?") — **never** regenerates entries, only adjusts wording. Step 6 cross-doc consistency, Step 7 TODOS cleanup, Step 8 VERSION bump question (always asks, never silent).
- Step 9 commits, pushes, updates PR/MR body with a `## Documentation` section and a doc diff preview, and re-syncs the PR title to match VERSION via the same helper `/ship` uses.

## Notes

Hard rules: never clobber CHANGELOG entries (a real incident drove this), never bump VERSION silently, always include a one-line summary of what changed per file. The final output is a structured doc-health summary listing every doc file with status (Updated / Current / Voice polished / Skipped / etc.).

## See also

[ship.md](./ship.md), [land-and-deploy.md](./land-and-deploy.md), [retro.md](./retro.md)
