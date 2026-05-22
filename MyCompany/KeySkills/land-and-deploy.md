# /land-and-deploy

> Merge the PR, wait for CI and deploy, verify production health — the workflow that takes over after `/ship`.

## Summary

`/land-and-deploy` is the second half of the shipping pipeline. `/ship` produces a PR; this skill merges it, watches CI, follows the deploy through whichever platform you use (Fly.io, Render, Vercel, Netlify, Heroku, GitHub Actions, or a custom hook), and then runs canary checks against the production URL to confirm the deploy is actually healthy. The point is to make "merge and verify" a single command instead of five terminal tabs.

## When to use

- The PR has green reviews and you want it merged, deployed, and verified in one go
- You want canary validation against the live URL after a release
- Voice/text aliases: "merge", "land", "deploy", "merge and verify", "land it", "ship it to production"
- Proactively suggest after `/ship` finishes and the PR is ready

## Sample prompts

```text
/land-and-deploy
land PR #312 and verify it's healthy in prod
merge and deploy — the PR is approved
ship it to production, watch the Fly.io deploy
land it and run canary checks on https://app.example.com
merge and verify, then post the deploy report
```

## How it works

- **Pre-flight + dry-run:** detects platform from CLAUDE.md `## Deploy Config` or auto-detects (`fly.toml`, `vercel.json`, GH Actions, etc.), checks `gh auth`, tests the production URL.
- **Pre-merge readiness gate:** review staleness, test results, PR body accuracy, document-release check; one final confirmation.
- **Merge:** handles merge queues, detects whether CI auto-deploys, picks the right strategy (GH Actions / platform CLI / auto-deploy / custom hook).
- **Deploy wait:** polls the deploy with timeout-aware failure handling.
- **Canary verification:** uses the gstack browse daemon to hit prod, capture screenshots, and check for console errors / regressions, with depth tuned to risk.
- **Report + revert path:** structured deploy report; if canary fails, offers a revert.

## Notes

The skill is workspace-aware via `/landing-report` — it knows about VERSION collisions with sibling Conductor worktrees. Run `/setup-deploy` once per repo to persist platform, prod URL, health endpoint, and deploy command into CLAUDE.md so future lands are zero-config.

## See also

`/ship`, `/landing-report`, `/setup-deploy`, `/canary` — the surrounding pipeline: produce the PR, see the queue, configure deploys, monitor post-deploy.
