# /freeze

> Lock edits to a single directory for the session — any Edit or Write outside is blocked, not just warned.

## Summary

`/freeze` restricts file edits to a user-specified directory. Edit and Write operations outside that path are **blocked** via a PreToolUse hook, not just warned. Useful when debugging to prevent the agent from "fixing" unrelated code, when scoping a refactor to one module, or when working in a shared repo where you don't want collateral damage.

## When to use

- User says "freeze", "restrict edits", "only edit this folder", "lock down edits", "lock editing scope"
- Debugging a bug and the agent keeps reaching into unrelated files
- Scoping a refactor or feature to a specific module
- Pair with `/careful` (via `/guard`) for full safety on production-adjacent work
- Triggers: "freeze edits to directory", "lock editing scope", "restrict file changes"

## Sample prompts

```text
/freeze
Restrict edits to src/auth/ for this session.
Only let me edit packages/api/. Don't touch anything else.
/freeze src/billing — fix the rate limit bug without touching the rest of the codebase.
Lock down edits to the docs/ folder while I clean up the markdown.
```

## How it works

- Asks the user which directory to restrict to (free-text input, not multiple choice). Resolves to an absolute path with a trailing `/` so `/src` doesn't accidentally match `/src-old`.
- Writes the path to `~/.gstack/state/freeze-dir.txt`. A PreToolUse hook on Edit and Write reads `file_path` from the tool input and returns `permissionDecision: "deny"` if the path doesn't start with the freeze directory.
- Persists for the session via the state file; the hook reads it on every Edit/Write call.
- Affects Edit and Write only — Read, Bash, Glob, and Grep are unaffected. Not a security boundary: a shell command like `sed` can still modify files outside the boundary.
- Clear with `/unfreeze`, change with another `/freeze`, or end the session.

## Notes

Combine with `/careful` via `/guard` for maximum safety when touching prod or shared environments. Because Bash isn't sandboxed, this is "prevent the agent from drifting", not "prevent malicious changes."

## See also

[unfreeze.md](./unfreeze.md), [careful.md](./careful.md), [guard.md](./guard.md)
