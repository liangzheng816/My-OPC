# /design-shotgun

> Visual brainstorming — generate multiple AI design variants, open a comparison board, pick a direction.

## Summary

`/design-shotgun` is the explore-options skill. The agent generates several AI mockup variants for a screen or page, opens them side-by-side in your browser, collects structured feedback, and iterates until you approve a direction. It's brainstorming, not review — meant to be fast, divergent, and run anytime during development when you can't picture what something should look like.

## When to use

- User says "explore designs", "show me options", "design variants", "visual brainstorm", "I don't like how this looks"
- Stuck on what a new screen should look like
- Want to see N takes before committing to one direction
- Proactively suggest when the user describes a UI feature but hasn't seen what it could look like
- Can be invoked standalone or downstream from `/design-consultation` or `/plan-design-review`

## Sample prompts

```text
/design-shotgun
Show me 4 takes on the new pricing page.
I need a dashboard for usage metrics — show me some directions.
Brainstorm visuals for the onboarding screen, editorial feel, no AI slop.
Generate variants for the settings page. Follow DESIGN.md, don't go off the reservation.
Revisit the variants from last week's session and let me re-pick.
```

## How it works

- Step 0 checks `~/.gstack/projects/<slug>/designs/` for previous sessions; offers to revisit or start fresh.
- Step 1 gathers 5 dimensions of context: who, job-to-be-done, what exists, user flow, edge cases. Auto-reads DESIGN.md and recent office-hours notes when present.
- Uses the `gstack/design` binary: `$D variants` to fan out, `$D compare --serve` to open a comparison board with feedback collection, `$D iterate` to refine.
- All artifacts saved under `~/.gstack/projects/<slug>/designs/<date>/` — `approved.json` records the chosen variant.
- Embeds heavy UX principles (three laws of usability, scanning behavior, billboard design) as generation constraints to avoid AI-slop output.

## Notes

If DESIGN.md exists, variants honor it by default — the user has to explicitly say "go off the reservation" to diverge. Output flows naturally into `/design-html` for final implementation.

## See also

[design-consultation.md](./design-consultation.md), [design-html.md](./design-html.md), [plan-design-review.md](./plan-design-review.md)
