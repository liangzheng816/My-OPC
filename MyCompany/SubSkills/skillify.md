# /skillify

> Codify the most recent successful /scrape into a permanent ~200ms browser-skill.

## Summary

The productivity multiplier for `/scrape`. After a successful scrape, `/skillify` walks back through the conversation, lifts the working `$B` calls and intent, and synthesizes a self-contained browser-skill (`script.ts`, `script.test.ts`, an HTML fixture, plus a byte-identical copy of the browse-client SDK). It writes to a temp dir, runs the auto-generated fixture-replay test, and only after both test pass and explicit user approval does it commit the skill to disk. Next time you say something matching the same intent, `/scrape` runs the codified script in ~200ms instead of re-driving the page.

## When to use

- "skillify", "codify", "save this scrape", "make this permanent"
- Right after a `/scrape` call returned the JSON you wanted and you'd run it again
- Voice triggers: skillify, codify this scrape, save this scrape, make this permanent
- You're about to call `/scrape` on the same intent for the third time
- Do not call to codify mutating flows (that's `/automate`'s job)

## Sample prompts

```text
/skillify
skillify that — we'll scrape lobsters frontpage every morning
codify the last scrape as a global skill named lobsters-frontpage
save this scrape at project tier so only this repo gets it
make this permanent
that pypi-package-stats scrape worked — turn it into a skill
```

## How it works

- Step 1 provenance guard: searches back at most 10 turns for a bounded, accepted `/scrape` result; refuses if none found or if the user already moved on
- Step 2 proposes a short name, 3-5 trigger phrases, and a tier (global `~/.gstack/browser-skills/` or project `.gstack/browser-skills/`); checks for tier-shadowing collisions
- Step 3-6 synthesizes a pure `parseFromHtml(html)` function, captures a dated HTML fixture, writes a `★★`-strength test, and resolves the canonical `browse-client.ts` SDK to bundle byte-identical
- Step 7-8 stages via `stageSkill()` and runs `$B skill test --dir <staged>` (or `bun test` directly); up to two parser-fix retries, then discards on failure
- Step 9-11 approval gate, atomic `commitSkill()`, and post-commit verification (`$B skill list | grep <name>` + a live `$B skill run <name>` matching the prototype output)

## Notes

- Iron contract: nothing half-broken ever reaches disk. Test fails or user declines, the temp dir is `discardStaged`'d entirely.
- Skills are agent-authored, so they're written with `trusted: false`, `source: agent` in frontmatter.
- Single-target only (one `$B goto` per skill); fixture-replay tests are point-in-time and may go stale when the site rotates HTML.
- Bun runtime is required to run the codified skill (Phase 1 design carry-over).

## See also

`/scrape`, `/automate` — `/scrape` discovers the flow, `/skillify` cements it, `/automate` handles mutating flows.
