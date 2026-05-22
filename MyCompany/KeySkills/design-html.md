# /design-html

> Turn an approved design or plan into production-quality, Pretext-native HTML/CSS where text actually reflows.

## Summary

`/design-html` is the design finalization step. Instead of CSS approximations, it generates HTML driven by the Pretext layout engine: text reflows correctly, heights compute to content, cards size themselves, editorial spreads flow around obstacles. ~30KB overhead, zero deps. It accepts inputs from `/design-shotgun` (approved mockups), `/plan-ceo-review` (CEO plans), `/plan-design-review` (design context), or a freeform user description.

## When to use

- User says "finalize this design", "turn this into HTML", "build me a page", "implement this design", "code the mockup", "make it real"
- After `/design-shotgun` has produced an approved variant
- After `/plan-ceo-review` or `/plan-design-review` has a locked plan with UI scope
- Voice aliases: "build the design", "code the mockup", "make it real"
- Proactively suggest when the user has approved a design or plan and is moving to implementation

## Sample prompts

```text
/design-html
Turn the approved variant from /design-shotgun into a real page.
Build the pricing page based on the plan we just locked in.
Code up a landing page: hero, three feature cards, FAQ, footer. Editorial feel.
Take the mockup at ~/.gstack/projects/myapp/designs/2026-05-10/variant-2.png and make it real HTML.
```

## How it works

- Step 0 detects context: looks for CEO plans, approved.json, prior variants, and DESIGN.md under `~/.gstack/projects/<slug>/`.
- Embeds heavy UX principles ("don't make me think", scanning behavior, billboard design, navigation as wayfinding, mobile stakes) as decision constraints during generation.
- Smart API routing: picks the right Pretext patterns per design type (editorial spread vs dashboard vs chat UI vs marketing).
- Uses the `gstack/design` and `gstack/browse` binaries when available to generate visuals and preview output; degrades gracefully when neither is installed.

## Notes

Output is a finished artifact, not a draft — heights are computed, not faked. If no design context exists, the skill can still take a plain-English brief, but pairing with `/design-consultation` or `/design-shotgun` first produces dramatically better results.

## See also

[design-consultation.md](./design-consultation.md), [design-shotgun.md](./design-shotgun.md), [design-review.md](./design-review.md)
