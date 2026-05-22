# /setup-deploy

> Configure deployment settings for /land-and-deploy.

## Summary

One-time deploy configuration so that future `/land-and-deploy` runs skip detection. Probes the repo for platform config (Fly.io, Render, Vercel, Netlify, Heroku, Railway, GitHub Actions, custom), captures the production URL, health check, and deploy-status command, then writes it all to a `## Deploy Configuration` block in CLAUDE.md. Idempotent: rerun any time the setup changes.

## When to use

- "setup deploy", "configure deployment", "set up land-and-deploy"
- Voice triggers: configure deploy, setup deployment, set deploy platform
- First time onboarding a repo to gstack's ship/deploy pipeline
- Your deploy platform or production URL changed and `/land-and-deploy` is now polling the wrong thing
- You want post-deploy health checks but haven't told gstack how to verify

## Sample prompts

```text
/setup-deploy
set up land-and-deploy for this Fly app
configure deployment — we just moved from Heroku to Render
how do I deploy with gstack? this is a Next.js app on Vercel
add deploy config — production URL is https://app.acme.com/ and health is /api/status
our pre-merge hook is `bun run build`, the deploy is GitHub Actions on push to main
```

## How it works

- Reads any existing `## Deploy Configuration` block and offers to reconfigure, edit one field, or accept as-is
- Detects platform via `fly.toml`, `render.yaml`, `vercel.json`/`.vercel`, `netlify.toml`, `Procfile`, `railway.json`, or deploy-flavored workflows in `.github/workflows`
- For each platform: extracts app/service names, probes the platform CLI if installed, infers URL, picks a sensible health endpoint
- Falls through to AskUserQuestion for custom setups (trigger style, URL, status check, hooks)
- Writes the block to [CLAUDE.md](../CLAUDE.md), then verifies the health check and status command both work

## Notes

- Never prints full API keys or tokens.
- CLAUDE.md is the single source of truth — there's no separate `.deploy` config file.
- Library/CLI projects can declare "this project doesn't deploy" and the block records that explicitly.

## See also

`/land-and-deploy`, `/ship`, `/canary` — the deploy pipeline this configures.
