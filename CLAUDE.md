# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is not a software project. It is a **personal AI tooling workspace** for the user (Microsoft employee, `liangzheng@microsoft.com`). The remote is <https://github.com/liangzheng816/MyOPC>. The repo contains:

- Enforcement of the gstack toolchain via a `PreToolUse` hook on the `Skill` tool.
- Documentation, indexes, and project-local snapshots of every Claude Code skill the user has installed globally.
- Empty staging folders for future personal skills and work output.

There is no build, no test suite, no lint config, no application code. Do not invent build/test commands. Tasks here are almost always: install a new skill, document an installed skill, reorganize the index, or commit/push the result.

## gstack (REQUIRED — global install)

**Before doing ANY work, verify gstack is installed:**

```bash
test -d ~/.claude/skills/gstack/bin && echo "GSTACK_OK" || echo "GSTACK_MISSING"
```

If GSTACK_MISSING: STOP. Do not proceed. Tell the user:

> gstack is required for all AI-assisted work in this repo.
> Install it:
> ```bash
> git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
> cd ~/.claude/skills/gstack && ./setup --team
> ```
> Then restart your AI coding tool.

Do not skip skills, ignore gstack errors, or work around missing gstack. The `.claude/hooks/check-gstack.sh` hook will deny `Skill` tool calls if `~/.claude/skills/gstack/bin` is missing — fix the install rather than bypassing the hook.

Use gstack skills (`/qa`, `/ship`, `/review`, `/investigate`, `/browse`, etc.) for the work they're designed for. Use `/browse` for all web browsing. Use `~/.claude/skills/gstack/...` for gstack file paths (the global path).

## Directory map

- [`.claude/`](.claude/) — project-level hook and `settings.json` that registers it. The hook fails closed if gstack isn't installed globally.
- [`MyCompany/`](MyCompany/) — index + per-skill summaries for every installed Claude Code skill. Each subfolder serves a different source:
  - [`MyCompany/README.md`](MyCompany/README.md) — entry index for the gstack lineup, split into 26 specialists ([`KeySkills/`](MyCompany/KeySkills/)) and 21 supporting tools ([`SubSkills/`](MyCompany/SubSkills/)).
  - [`MyCompany/PMSkills/`](MyCompany/PMSkills/) — 9 PM-framework skills from <https://github.com/liangzheng816/pm-skills>, with the 100-framework reference library under [`PM_Frameworks/`](MyCompany/PMSkills/PM_Frameworks/).
  - [`MyCompany/MySkills/`](MyCompany/MySkills/) — 5 "convert anything to Markdown" skills from <https://github.com/liangzheng816/StandaloneSkills>.
  - [`MyCompany/MyOwnSkills/`](MyCompany/MyOwnSkills/) — empty; reserved for first-party skills the user authors.
- [`WorkOutput/`](WorkOutput/) — empty; reserved for skill outputs that the user wants to keep in-repo.

## Installed skills (global)

All three skill collections below are installed at `~/.claude/skills/` and effective in every project on this machine. Updates:

```bash
# gstack
cd ~/.claude/skills/gstack && git pull && ./setup
# PM skills
cd ~/.claude/skills/pm-skills && git pull   # then re-run the path-rewrite step
# StandaloneSkills
cd ~/.claude/skills/StandaloneSkills && git pull   # junctioned, updates in place
```

| Collection | Source | Layout in `~/.claude/skills/` | Index in repo |
| --- | --- | --- | --- |
| gstack (47 skills) | <https://github.com/garrytan/gstack> | One folder per skill, built by `./setup` | [`MyCompany/README.md`](MyCompany/README.md) |
| PM skills (9) | <https://github.com/liangzheng816/pm-skills> | Per-skill `SKILL.md` rewritten to absolute `PM_Frameworks/` path | [`MyCompany/PMSkills/README.md`](MyCompany/PMSkills/README.md) |
| StandaloneSkills (5) | <https://github.com/liangzheng816/StandaloneSkills> | Per-skill Windows directory junctions back to the source clone | [`MyCompany/MySkills/README.md`](MyCompany/MySkills/README.md) |

## Working in this repo

- **Adding a new skill collection:** clone the source to `~/.claude/skills/<name>/`, expose each skill at `~/.claude/skills/<skill>/` (copy, junction via `mklink /J`, or per-skill registration script — pick whichever the source supports), then add a sibling folder under `MyCompany/` with a `README.md` index and project-local snapshot. Match the structure of `MySkills/` or `PMSkills/`.
- **Adding a personal skill:** scaffold under `MyCompany/MyOwnSkills/<skill>/` with a `SKILL.md` frontmatter (`name`, `description`, `allowed-tools`), and either copy or junction it to `~/.claude/skills/<skill>/` to make it globally effective.
- **Re-running enforcement:** the `PreToolUse` hook on `Skill` is the only automation in this repo. If it misfires, inspect [`.claude/hooks/check-gstack.sh`](.claude/hooks/check-gstack.sh) and [`.claude/settings.json`](.claude/settings.json) — don't disable hooks via `--no-verify` style escapes.
- **Pushing changes:** `main` tracks `origin/main` at `liangzheng816/MyOPC`. Confirm with the user before pushing — this repo is public-visibility (the remote is private), and the user gates pushes per-task.

## Environment notes

- Windows 11 + PowerShell, Bash via Git Bash. Bun 1.3.7, Node 22, Git 2.54 are installed.
- The user prefers PowerShell-native syntax for sandbox-friendly shells, but the gstack `./setup` script is bash-only and must be run via Git Bash (`C:\Program Files\Git\bin\bash.exe`).
- `git init -b main` here would be denied by the harness's project-modification guard — that step was done with explicit user authorization. Treat any further repo-state-changing setup as requiring confirmation.
