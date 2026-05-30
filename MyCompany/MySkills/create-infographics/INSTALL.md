# Installation

## Prerequisites

You need ONE of these JavaScript runtimes:

- **`bun`** (recommended — fastest) — install from <https://bun.sh>
- **`npx`** (works via Node.js) — bundled with Node.js

You need an **API key** for at least one image-gen provider. Default: Google Gemini.

```bash
# macOS / Linux / Git Bash
export GOOGLE_API_KEY="your-key-here"
```

```powershell
# PowerShell (Windows)
$env:GOOGLE_API_KEY = "your-key-here"
```

Other supported providers (set the corresponding env var):

- OpenAI: `OPENAI_API_KEY`
- OpenRouter: `OPENROUTER_API_KEY`
- DashScope (Alibaba): `DASHSCOPE_API_KEY`
- Replicate: `REPLICATE_API_TOKEN`
- Jimeng (Volcengine): `JIMENG_ACCESS_KEY_ID` + `JIMENG_SECRET_ACCESS_KEY`
- Seedream (Volcengine ARK): `ARK_API_KEY`

---

## Install — Claude Code

### Option A: copy the whole skill (recommended)

```bash
# from inside the create_infographics directory
cp -r . ~/.claude/skills/create-infographics
```

Or, if you have the parent folder:

```bash
cp -r create_infographics ~/.claude/skills/
mv ~/.claude/skills/create_infographics ~/.claude/skills/create-infographics
```

Verify:

```bash
ls ~/.claude/skills/create-infographics
# Should list: SKILL.md README.md INSTALL.md references/ examples/ deps/ scripts/
```

### Option B: symlink (for development)

```bash
ln -s "$(pwd)/create_infographics" ~/.claude/skills/create-infographics
```

This is useful if you want to edit the skill files in place and have changes picked up immediately.

---

## Install — Codex

```bash
cp -r create_infographics ~/.codex/skills/
mv ~/.codex/skills/create_infographics ~/.codex/skills/create-infographics
```

Codex agents will automatically discover the skill on next session start.

---

## Install — OpenClaw

```bash
cp -r create_infographics ~/.openclaw/skills/
mv ~/.openclaw/skills/create_infographics ~/.openclaw/skills/create-infographics
```

---

## Install — Other Agents

For any agent that supports a `~/.config/<agent>/skills/` directory or similar:

```bash
cp -r create_infographics <agent-skills-dir>/create-infographics
```

---

## First-Run Setup (Important)

The bundled `baoyu-image-gen` skill will prompt for preferences on first use. When you trigger any infographic generation, you'll see a setup flow asking:

1. **Default image gen provider** (Google / OpenAI / OpenRouter / DashScope / Replicate)
2. **Default quality** (`2k` recommended for infographics)
3. **Default save location**

Pick once, and the preferences are saved to `~/.baoyu-skills/baoyu-image-gen/EXTEND.md`.

If you want to pre-configure without the interactive prompt:

```bash
mkdir -p ~/.baoyu-skills/baoyu-image-gen
cat > ~/.baoyu-skills/baoyu-image-gen/EXTEND.md <<'EOF'
---
version: 1
default_provider: google
default_quality: 2k
default_aspect_ratio: null
default_image_size: null
default_model:
  google: gemini-3-pro-image-preview
  openai: null
  openrouter: null
  dashscope: null
  replicate: null
---
EOF
```

---

## Verify Installation

After install, test the skill in your agent:

> Create an infographic that summarizes the differences between waterfall and agile methodologies.

The agent should invoke `create-infographics`, generate a binary-comparison layout in executive-saas style, and save a PNG.

---

## Uninstall

```bash
# Claude Code
rm -rf ~/.claude/skills/create-infographics

# Codex
rm -rf ~/.codex/skills/create-infographics

# OpenClaw
rm -rf ~/.openclaw/skills/create-infographics
```

The bundled `baoyu-image-gen` preferences (`~/.baoyu-skills/`) survive uninstall — delete that folder too if you want a clean wipe.

---

## Troubleshooting

### "bun: command not found"

Install bun: <https://bun.sh/docs/installation>. Or use npx instead — the bundled `baoyu-image-gen` SKILL.md detects `npx` automatically.

### "GOOGLE_API_KEY not set"

Export the key in your shell profile (`.bashrc`, `.zshrc`, or PowerShell `$PROFILE`). For other providers, see the list at the top of this file.

### Generated images have duplicated section badges (the "two 04" bug)

Read [references/anti-duplication.md](references/anti-duplication.md). The skill's default prompts include the anti-duplication safeguards, but if you're customizing prompts, you must keep them.

### Generated images have illegible small text at 9:16

Cap section count at 6. See [references/anti-duplication.md](references/anti-duplication.md) Rule 1.

### Images look "designer-y" but the user wanted a chalkboard or academic feel

Apply an explicit style override. See [references/rendering-rules.md](references/rendering-rules.md) Layer 7.

### Permission errors creating `~/.baoyu-skills/`

Make sure your home directory is writable. On Windows under WSL, your home is `/home/<user>` not `/mnt/c/Users/<user>`.

---

## Updating

To pull a newer version of the bundled `baoyu-image-gen`:

```bash
# Get latest from upstream
cd ~/.claude/skills/create-infographics/deps
rm -rf baoyu-image-gen
cp -r ~/.claude/skills/baoyu-image-gen .  # if you have it installed standalone
```

(There's no auto-updater — the skill is self-contained at install time.)
