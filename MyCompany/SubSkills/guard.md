# /guard

> Full safety mode: destructive command warnings plus directory-scoped edit restrictions.

## Summary

`/guard` activates maximum-safety mode by stacking two protections at once: warnings before destructive shell commands (the `/careful` behavior) and a hard boundary on which directory you can edit (the `/freeze` behavior). Use it when you are touching production, debugging a live system, or doing anything where a stray `rm -rf` or an unrelated file edit would be expensive. It is the single command for "lock it down" before risky work.

## When to use

- Touching prod or a live customer-facing system
- Debugging on a shared environment where you must not edit unrelated code
- Voice/text aliases: "guard mode", "full safety", "lock it down", "maximum safety"
- Pair with high-stakes ops: schema migrations, force-pushes, kubectl on real clusters

## Sample prompts

```text
/guard
guard mode — restrict edits to src/billing/ while I debug a prod incident
turn on full safety, I'm about to touch the live database
lock it down to apps/web/ before we start
maximum safety please — I'm SSH'd into the staging box
careful + freeze mode on packages/auth/
```

## How it works

- Combines `/careful` (warns before `rm -rf`, `DROP TABLE`, `git push --force`, `git reset --hard`, `kubectl delete`, etc.) with `/freeze` (blocks `Edit`/`Write` outside an allowed directory).
- On invocation it asks (via AskUserQuestion) which directory to restrict edits to, resolves it to an absolute path, and writes it to the gstack state file `freeze-dir.txt`.
- Hooks run on every `Bash`, `Edit`, and `Write` tool call: `check-careful.sh` for shell, `check-freeze.sh` for file edits.
- Destructive warnings can be overridden interactively; edit-boundary violations are blocked outright.
- Run `/unfreeze` to drop the edit boundary; end the session to clear everything.

## Notes

`/guard` is a thin composition over its siblings, so both `/careful` and `/freeze` must be installed (they ship together via the gstack setup script). The skill itself does not change git state — it just gates other tools.

## See also

`/careful`, `/freeze`, `/unfreeze` — the building blocks `/guard` composes and the escape hatch.
