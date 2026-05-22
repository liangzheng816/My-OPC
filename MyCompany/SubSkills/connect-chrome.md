# /connect-chrome

> Launch GStack Browser — a visible Chromium window with the gstack sidebar extension, live activity feed, anti-bot stealth, and chat-driven control.

## Summary

Brings up a headed Chromium (rebranded as "GStack Browser") loaded with the sidebar extension so you can watch the agent navigate, click, and fill forms in real time. The sidebar shows a live command activity feed and has a chat tab where a child Claude instance executes your natural-language requests inside the browser. Anti-bot stealth patches are built in so Google, NYTimes, and similar fingerprinters work without captchas. Your regular Chrome stays untouched — this is a separate Playwright-controlled window.

## When to use

- "Open gstack browser" / "launch chromium" / "show me the browser"
- "Connect chrome so I can watch what you're doing"
- "I want to use the side panel chat to drive a browser task"
- "Real browser" / "control my browser" / "side panel"
- Voice aliases: "show me the browser"

## Sample prompts

```text
/connect-chrome
open gstack browser and go to https://news.ycombinator.com
launch chrome — I want to watch the next /qa run in a visible window
connect chrome, then run /design-review on https://staging.acme.com so I can see every screenshot
show me the browser, open the side panel, and let me drive from the chat tab
launch chromium — I need to manually log in to https://app.acme.com before the agent takes over
```

## How it works

- Step 0 runs a pre-flight cleanup: kills stale browse daemons and removes Chromium profile lock files (`SingletonLock`, etc.) that can persist after crashes.
- Step 1 runs `$B connect` which spawns headed Chromium via `launchPersistentContext` with the sidebar extension auto-loaded, fixed port 34567 for extension auto-connect, and anti-bot patches (e.g., `--disable-blink-features=AutomationControlled`).
- Step 2 verifies `Mode: headed` via `$B status` and reads the port from `.gstack/browse.json`. Step 3 walks the user through pinning the extension and opening the Side Panel.
- Step 4 demos with `$B goto news.ycombinator.com` + `$B snapshot -i` so the activity feed populates. Step 5 explains the sidebar chat — a child Claude instance with up to 5min per task that drives the browser via natural language.
- `$B disconnect` returns to headless mode; `$B focus` brings the window forward.

## Notes

The SKILL.md is named `open-gstack-browser` on disk but exposes both `/connect-chrome` and `/open-gstack-browser` as triggers. Headless `/browse` is faster for batch QA; this skill is for when you want to *see* what the agent is doing or hand off CAPTCHA/MFA flows.

## See also

`/browse`, `/setup-browser-cookies`, `/pair-agent`, `/qa`, `/design-review`
