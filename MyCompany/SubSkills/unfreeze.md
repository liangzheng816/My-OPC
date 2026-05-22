# /unfreeze

> Clear the freeze boundary set by /freeze, allowing edits everywhere again.

## Summary

The companion to `/freeze`. Removes the directory restriction so the Edit and Write tools can touch any path again, without ending the Claude Code session. The freeze state file is deleted; the freeze hooks stay registered for the session but become no-ops because there's nothing to enforce.

## When to use

- "unfreeze", "unlock edits", "remove freeze", "allow all edits"
- Voice triggers: unfreeze edits, unlock all directories, remove edit restrictions
- You finished debugging inside the frozen module and want to touch surrounding files again
- A previous `/freeze` is blocking a legitimate cross-cutting edit (CLAUDE.md, package.json, etc.)

## Sample prompts

```text
/unfreeze
unlock all directories — I need to update the package.json too
remove the freeze, I'm done in src/auth
allow all edits again
```

## How it works

- Reads `$GSTACK_STATE_ROOT/freeze-dir.txt` to see what was previously frozen
- Deletes the state file and reports the previous frozen path
- Tells the user edits are allowed everywhere; mentions that `/freeze` can be re-invoked to restrict again

## Notes

- The freeze hooks themselves are session-scoped and stay registered; only the state file is removed, which is enough to make them permissive.
- This skill has a very small SKILL.md compared to the rest of gstack — no preamble, no telemetry, no AskUserQuestion. It's intentionally a one-shot toggle.

## See also

`/freeze`, `/guard`, `/careful` — `/guard` combines `/freeze` with destructive-command warnings.
