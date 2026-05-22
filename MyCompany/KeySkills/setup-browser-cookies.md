# /setup-browser-cookies

> Import cookies from your real Chromium browser into the headless browse session.

## Summary

Bridges your real, logged-in browser profile (Chrome, Brave, Edge, Comet, etc.) and the gstack headless browse session that drives QA and scraping. Opens a picker UI where you tick which domains to import; cookies are decrypted on the spot and loaded into the Playwright session so the next `$B goto` lands authenticated. Use it before any test that touches a logged-in page so you don't have to script the login flow.

## When to use

- "import cookies", "login to the site", "authenticate the browser"
- Voice triggers: import browser cookies, login to test site, setup authenticated session
- About to QA or scrape a page that's gated behind login (auth wall, paywall, dashboard)
- A previous `/qa` or `/scrape` run hit a redirect to `/login`

## Sample prompts

```text
/setup-browser-cookies
import my github.com cookies so we can scrape private repo issues
authenticate the browser for app.linear.app before /qa
login to the staging site at https://staging.acme.dev so I can test the dashboard
/setup-browser-cookies comet --domain stripe.com
the test keeps bouncing to /login — pull cookies from my real browser
```

## How it works

- Checks if browse is already CDP-attached to your live browser; if yes, stops immediately (no import needed)
- Auto-detects installed Chromium browsers and opens an interactive picker UI on the browse server's port
- You select domains in the UI (search, add via "+", remove via trash); only domain names and counts are shown, never cookie values
- Direct mode skips the UI: `$B cookie-import-browser <browser> --domain <host>`
- Verifies with `$B cookies` and reports a per-domain count summary

## Notes

- On macOS the first import per browser triggers a Keychain prompt; click Allow.
- Linux uses `secret-tool`/libsecret for v11 cookies, falls back to Chromium's v10 key.
- The browse session persists cookies across commands, so imports take effect immediately for the rest of the session.
- One-time `bun`-based build of the browse binary may run on first use (~10s).

## See also

`/qa`, `/scrape`, `/connect-chrome` — pair when the target requires login.
