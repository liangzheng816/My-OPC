# /review

> Pre-landing PR review: analyzes the branch diff for SQL safety, LLM trust boundary violations, conditional side effects, and structural issues tests don't catch.

## Summary

The last gate before a PR lands. The skill diffs the current branch against the detected base branch, runs a scope-drift check (did you build what was requested — nothing more, nothing less?), extracts the plan's actionable items if one exists, and audits the structural issues that tests typically miss: SQL injection patterns, LLM trust boundaries, conditional side effects, missing observability, broken error handling.

## When to use

- About to ship a PR and you want a real review before `/ship` or merging.
- You want scope-creep and missing-requirements detection against TODOS.md / PR body / commit messages.
- Voice triggers: "review this PR", "code review", "check my diff", "pre-landing review".
- Proactively suggest when the user is about to merge or land changes.

## Sample prompts

```text
/review before I /ship
code review the current branch against main
check my diff — I'm worried I scope-crept into the worker
/review — does this match what TODOS.md said we were building
pre-landing review on this branch, focus on the LLM call sites
PR #123 is ready to review locally, run /review against the diff
```

## How it works

- Detects base branch via `gh`/`glab` or git symbolic-ref (falls back to main/master).
- Step 1.5 scope drift: cross-references diff vs TODOS.md, PR body, and commit messages — flags out-of-scope changes and missing requirements (informational, doesn't block).
- Plan file discovery: conversation context first, then `~/.gstack/projects/{slug}/`, `~/.claude/plans/`, `~/.codex/plans/`, `.gstack/plans/` — validates by branch/repo match.
- Extracts actionable items (checkbox, numbered steps, imperatives, file specs, test reqs, data model changes) and checks each against the diff.
- Audits structural issues: SQL safety, prompt injection surfaces, conditional side effects, error paths, observability gaps.

## Notes

Designed to run before [ship](./ship.md) creates the PR — that's why it falls back to commit messages and TODOS.md for stated intent when no PR exists yet. Sibling to [security-review](./security-review.md) (security-only focus) and `/qa` (browser-driven behavioral testing). Allows the `Agent` tool, so it can fan out sub-analyses on a big diff.

## See also

`/ship`, `/qa`, `/security-review`, `/land-and-deploy`
