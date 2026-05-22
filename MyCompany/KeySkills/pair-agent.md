# /pair-agent

> Pair another AI agent (OpenClaw, Codex, Cursor, Hermes, anything that speaks HTTP) with your gstack browser.

## Summary

`/pair-agent` lets you share your local browser with a different AI agent so it can navigate, click, fill forms, and screenshot — using your session, in its own tab. The skill generates a one-time setup key (5-minute TTL, single use), prints copy-paste instructions for the other agent, and provisions a 24-hour scoped session token. Each paired agent gets its own tab and cannot touch tabs it didn't create. Default scope is read+write; admin (JS execution, cookies, storage) is opt-in. For same-machine pairings, credentials get written directly into the target agent's config so there's no copy-paste step.

## When to use

- You have a remote OpenClaw, Hermes, or Codex instance that needs a browser
- Two Claude Code sessions need to share the same headed Chromium
- Voice/text aliases: "pair agent", "connect agent", "share browser", "remote browser", "let another agent use my browser", "give browser access", "share my browser"
- You want to grant a teammate's agent temporary, scoped access to your browser

## Sample prompts

```text
/pair-agent
pair agent — my OpenClaw instance on the same Mac needs browser access
connect agent: a Codex session on my remote dev box should drive my Chrome
share my browser with another Claude Code window, read+write scope
give a Cursor agent admin access (JS + cookies) for one hour
pair with Hermes — generic HTTP instructions, ngrok tunnel is already up
```

## How it works

- **Setup check:** same `$B` resolution as `/open-gstack-browser`. Builds if missing.
- **Pre-flight:** `$B status`; starts the server with `$B goto about:blank` if not running.
- **Target selection:** AskUserQuestion picks the target host (`openclaw`, `codex`, `cursor`, `claude`, or generic). Generic uses portable curl instructions.
- **Local vs remote:** local writes credentials directly to `~/.openclaw/`, `~/.codex/`, `~/.cursor/`, etc. Remote uses ngrok — auto-starts the tunnel if installed and authed, otherwise walks the user through `brew install ngrok` + `ngrok config add-authtoken`.
- **Issue token:** `$B pair-agent --client <host>` (or `--admin --client <host>` for full scope) emits an instruction block between `═══` lines that must be output verbatim for the user to copy.
- **Verify + revoke:** `$B status` confirms the connection; `$B tunnel revoke <name>` removes one agent; `$B tunnel rotate` invalidates all scoped tokens at once.

## Notes

Setup key is single-use with a 5-minute TTL, so it's safe to paste into a chat. Default token is read+write only — the remote agent cannot execute arbitrary JS, read cookies, or touch storage unless you used `--admin`. Rate limit is 10 req/s; tokens last 24 hours. If the remote agent hits "Tab not owned by your agent", it forgot to call `newtab` first.

## See also

`/open-gstack-browser`, `/connect-chrome` — open the browser first; `/pair-agent` is how you share it.
