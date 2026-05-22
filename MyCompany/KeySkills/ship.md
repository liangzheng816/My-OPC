# /ship

> Fully automated ship workflow: merge base, test, review, bump version, commit, push, open PR.

## Summary

The end-to-end "make this branch shippable" command. Non-interactive by design: merges in the base branch, runs tests, audits coverage and plan completion, runs a pre-landing diff review, bumps VERSION, regenerates CHANGELOG from the diff, commits, pushes, and opens (or updates) the PR. Stops only when a human decision is unavoidable — merge conflicts, in-branch test failures, MINOR/MAJOR version bumps, ASK-tier review findings, or plan items not done. Output is the PR URL.

## When to use

- "ship", "ship it", "create a PR", "push to main", "deploy", "merge and push"
- Voice triggers: ship it, send it, get it deployed
- Code is ready and the user wants it on a PR with the full pre-landing gauntlet
- Proactively invoke instead of running `git push` or `gh pr create` directly when the user says code is ready
- Rerun on the same branch to re-verify after follow-up commits (idempotent on actions, not on checks)

## Sample prompts

```text
/ship
this is done — ship it
push this branch up and open a PR
the feature is ready, get it on a PR with tests passing
ship it but I think there's a minor version bump needed
re-ship — I addressed the review feedback
```

## How it works

- Step 0 detects git platform (GitHub via `gh`, GitLab via `glab`, or git-native fallback) and the base branch
- Step 1-3 pre-flight, prints the Review Readiness Dashboard, merges in the base branch before tests
- Step 4-5 bootstraps the test framework if needed, runs tests, triages failures (in-branch must be fixed, pre-existing get TODOed or assigned)
- Step 6 runs eval suites for prompt-related changes; Step 7 audits AI-assessed test coverage with a configurable hard gate
- Step 8-8.1 audits plan completion against `## Implementation Items` and a verification section; missing items block unless overridden
- Step 9 runs the pre-landing diff review (and lite design check when frontend files changed); Step 12-19 bump VERSION, update CHANGELOG, commit in bisectable splits, push, and open or update the PR

## Notes

- Pairs with `/land-and-deploy` for the merge-and-verify-prod half of the pipeline.
- Re-running `/ship` always re-verifies; only the *actions* (version bump, push, PR creation) are idempotent.
- The `[gstack-context]` blocks in continuous-checkpoint WIP commits are squashed into clean commits during ship.
- Never stops for uncommitted changes, version bump choice (MICRO/PATCH auto-picked), CHANGELOG content, commit messages, or auto-fixable findings (dead code, N+1, stale comments).

## See also

`/land-and-deploy`, `/review`, `/qa`, `/document-release` — the pre-merge and post-merge bookends.
