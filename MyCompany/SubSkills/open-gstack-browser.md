# /open-gstack-browser

> Launch a visible AI-controlled Chromium with the gstack sidebar extension — watch every action in real time.

## Summary

`/open-gstack-browser` boots GStack Browser, a rebranded headed Chromium that ships with the gstack sidebar extension pre-loaded, anti-bot stealth patches, and a custom user agent. Unlike the default headless `browse` mode, this window is visible: you can see every navigation, click, fill, and screenshot as it happens, and the sidebar shows a live activity feed plus a chat tab driven by an isolated agent process. Use it when you want to dogfood, debug, or just watch Claude work.

## When to use

- You want to see what `/qa`, `/design-review`, or `/benchmark` actually do in the browser
- Sites with bot detection (Google, NYTimes) need the stealth-patched headed mode
- Voice/text aliases: "open gstack browser", "launch browser", "connect chrome", "open chrome", "real browser", "launch chrome", "side panel", "control my browser", "show me the browser"
- You want a chat surface inside the browser sidebar that can navigate and click on its own

## Sample prompts

```text
/open-gstack-browser
show me the browser so I can watch /qa run
launch chrome with the sidebar — I want to see the activity feed
open gstack browser and navigate to https://news.ycombinator.com
real browser please — the headless one is hitting captchas
side panel — connect chrome so I can see what's happening
```

## How it works

- **Setup check:** resolves `$B` to `<skill>/browse/dist/browse` (project or home install). If missing, prompts the user before running `./setup`; auto-installs `bun` with a pinned checksum.
- **Pre-flight cleanup:** kills any stale `browse.json` server, removes Chromium `SingletonLock/Socket/Cookie` files that persist after crashes.
- **Connect:** `$B connect` launches Chromium in headed mode via `launchPersistentContext` with the extension auto-loaded; uses fixed port 34567 so the extension auto-connects.
- **Verify + guide:** runs `$B status` to confirm `Mode: headed`, then walks the user through pinning the extension and opening the Side Panel (with a fallback path via `chrome://extensions` and "Load unpacked").
- **Demo + handoff:** runs `$B goto` + `$B snapshot -i` so the user sees commands appear in the activity feed; then explains the sidebar chat (a child Claude with a 5-minute per-task budget) and the rest of the `$B` command surface (`goto`, `click`, `fill`, `focus`, `disconnect`).

## Notes

The Playwright-controlled Chromium is separate from your daily Chrome — your existing profile is untouched. If the extension doesn't appear after launch, the recovery path is documented inline (puzzle-piece icon → pin, or `chrome://extensions` → Load unpacked with `Cmd+Shift+G`). For remote agent sharing instead of local use, see `/pair-agent`.

## See also

`/pair-agent`, `/connect-chrome`, `/qa`, `/design-review`, `/benchmark` — share access with another agent, or run skills that benefit from a visible browser.
