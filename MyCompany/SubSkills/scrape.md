# /scrape

> Pull data from a web page. First call prototypes via `$B` primitives and returns JSON; once codified by `/skillify`, subsequent calls run in ~200ms.

## Summary

One entry point for getting data off the web. Read-only by contract. On a new intent the skill drives the page with browse primitives, returns clean JSON, and nudges you to run `/skillify` to make it permanent. On a matching intent it runs the codified browser-skill via `$B skill run` and returns in ~200ms. Mutating flows (form fills, clicks that change state) are refused and routed to `/automate`.

## When to use

- You need data off a page once, or want to set up a repeatable scrape.
- The intent is read-only — extracting names, prices, links, structured rows.
- Voice triggers: "scrape", "get data from", "pull from", "extract from", "what is on".
- Do NOT use for mutating actions — those route to `/automate`.

## Sample prompts

```text
/scrape top stories on Hacker News
get data from example.com/products — product names and prices
pull the headlines off https://news.ycombinator.com
what's on https://acme.com/changelog right now
extract from https://github.com/garrytan/gstack the README and recent commits
scrape the speakers list at https://confurl.com/2026
```

## How it works

- Step 1: Determine intent — one-line description, asked once if missing.
- Step 2: Refuse mutating verbs (submit, post, log in, click X, fill, delete, create, order, book) and route to `/automate`.
- Step 3: Match phase — `$B skill list` then `$B skill show` per candidate; runs the narrower-tier skill on confident match (project > global > bundled).
- Step 4: Prototype phase — `$B goto`, `$B snapshot --text`, `$B html`, `$B links`; iterate selectors and emit one JSON document on stdout.
- Step 5: Skillify nudge — one line, suggesting `/skillify` to make it ~200ms next time.
- Failure mode: after 3-4 selector attempts with no sensible JSON, report what was tried and ask whether to switch selectors, switch pages, or stop.

## Notes

Output discipline matters: one JSON document on stdout, no prose around it unless asked — many callers pipe to `jq`. Does not handle auth flows (use `/setup-browser-cookies` first), multi-page crawls, or daemon-off scenarios. The match-vs-prototype split is the point: prototyping is exploratory and slow; skillified flows are deterministic and fast.

## See also

`/skillify`, `/setup-browser-cookies`, `/browse`, `/connect-chrome`
