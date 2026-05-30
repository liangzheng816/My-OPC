#!/usr/bin/env bash
# install.sh — Platform-aware installer for create-infographics

set -euo pipefail

SKILL_NAME="create-infographics"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

usage() {
  cat <<EOF
Usage: $(basename "$0") [--platform <name>] [--target-dir <path>] [--dry-run] [--force]

Install create-infographics into a Claude Code / Codex / OpenClaw skills directory.

Options:
  --platform <name>     Target platform: claude / codex / openclaw / auto (default: auto)
  --target-dir <path>   Explicit install path (overrides --platform)
  --dry-run             Show what would be done without copying
  --force               Overwrite existing install without prompting

Examples:
  $(basename "$0")                          # auto-detect platform
  $(basename "$0") --platform claude        # install for Claude Code
  $(basename "$0") --platform codex         # install for Codex
  $(basename "$0") --target-dir ~/my-skills # custom target

EOF
}

PLATFORM="auto"
TARGET_DIR=""
DRY_RUN=0
FORCE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --platform)
      PLATFORM="$2"
      shift 2
      ;;
    --target-dir)
      TARGET_DIR="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --force)
      FORCE=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

# Resolve target directory
if [[ -z "$TARGET_DIR" ]]; then
  case "$PLATFORM" in
    claude)
      TARGET_DIR="$HOME/.claude/skills/$SKILL_NAME"
      ;;
    codex)
      TARGET_DIR="$HOME/.codex/skills/$SKILL_NAME"
      ;;
    openclaw)
      TARGET_DIR="$HOME/.openclaw/skills/$SKILL_NAME"
      ;;
    auto)
      candidates=()
      [[ -d "$HOME/.claude/skills" ]] && candidates+=("claude:$HOME/.claude/skills/$SKILL_NAME")
      [[ -d "$HOME/.codex/skills" ]] && candidates+=("codex:$HOME/.codex/skills/$SKILL_NAME")
      [[ -d "$HOME/.openclaw/skills" ]] && candidates+=("openclaw:$HOME/.openclaw/skills/$SKILL_NAME")
      if [[ ${#candidates[@]} -eq 0 ]]; then
        echo "No platform skill directory detected." >&2
        echo "Pass --platform <claude|codex|openclaw> or --target-dir <path>." >&2
        exit 1
      elif [[ ${#candidates[@]} -gt 1 ]]; then
        echo "Multiple platform directories detected:" >&2
        for c in "${candidates[@]}"; do
          echo "  - ${c%%:*} → ${c#*:}" >&2
        done
        echo "Pass --platform <name> to choose, or --target-dir <path>." >&2
        exit 1
      fi
      TARGET_DIR="${candidates[0]#*:}"
      PLATFORM="${candidates[0]%%:*}"
      ;;
    *)
      echo "Unknown platform: $PLATFORM" >&2
      exit 1
      ;;
  esac
fi

echo "→ Source: $SOURCE_DIR"
echo "→ Target: $TARGET_DIR"
echo "→ Platform: $PLATFORM"
echo ""

# Check if target already exists
if [[ -e "$TARGET_DIR" ]]; then
  if [[ $FORCE -eq 0 ]]; then
    read -r -p "Target already exists. Overwrite? [y/N] " response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
      echo "Aborted."
      exit 0
    fi
  fi
  echo "→ Removing existing install..."
  [[ $DRY_RUN -eq 0 ]] && rm -rf "$TARGET_DIR"
fi

# Create parent dir if needed
PARENT="$(dirname "$TARGET_DIR")"
if [[ ! -d "$PARENT" ]]; then
  echo "→ Creating $PARENT"
  [[ $DRY_RUN -eq 0 ]] && mkdir -p "$PARENT"
fi

# Copy
echo "→ Copying skill files..."
if [[ $DRY_RUN -eq 1 ]]; then
  echo "  (dry run — no changes)"
else
  cp -r "$SOURCE_DIR" "$TARGET_DIR"
fi

# Verify
if [[ $DRY_RUN -eq 0 ]]; then
  if [[ -f "$TARGET_DIR/SKILL.md" ]]; then
    echo "✓ Installed successfully."
  else
    echo "✗ Install failed — SKILL.md not found in target." >&2
    exit 1
  fi
fi

# Check prerequisites
echo ""
echo "→ Checking prerequisites..."

check_command() {
  if command -v "$1" >/dev/null 2>&1; then
    echo "  ✓ $1 found"
    return 0
  else
    echo "  ✗ $1 NOT found"
    return 1
  fi
}

HAS_RUNTIME=0
check_command bun && HAS_RUNTIME=1
check_command npx && HAS_RUNTIME=1

if [[ $HAS_RUNTIME -eq 0 ]]; then
  echo ""
  echo "⚠ No JavaScript runtime detected. Install bun (https://bun.sh) or Node.js (which includes npx)."
fi

if [[ -z "${GOOGLE_API_KEY:-}" ]] && [[ -z "${OPENAI_API_KEY:-}" ]] && [[ -z "${OPENROUTER_API_KEY:-}" ]]; then
  echo ""
  echo "⚠ No image-gen API key detected in environment."
  echo "  Set at least one of: GOOGLE_API_KEY, OPENAI_API_KEY, OPENROUTER_API_KEY."
  echo "  Default provider is Google Gemini — get a key at https://aistudio.google.com/"
fi

echo ""
echo "Done. Restart your agent (Claude Code / Codex / OpenClaw) to pick up the new skill."
echo "To uninstall: rm -rf '$TARGET_DIR'"
