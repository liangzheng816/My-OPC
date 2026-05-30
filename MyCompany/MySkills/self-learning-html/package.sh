#!/usr/bin/env sh
# Package the self-learning-html skill into a portable zip archive.
#
# Usage:
#   ./package.sh             -> dist/self-learning-html.zip
#   ./package.sh v1.0.0      -> dist/self-learning-html-v1.0.0.zip

set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_NAME="self-learning-html"
VERSION="${1:-}"

if [ -n "$VERSION" ]; then
    ZIP_NAME="${SKILL_NAME}-${VERSION}.zip"
else
    ZIP_NAME="${SKILL_NAME}.zip"
fi

DIST_DIR="${SCRIPT_DIR}/dist"
STAGING_DIR="${DIST_DIR}/staging"
SKILL_STAGING="${STAGING_DIR}/${SKILL_NAME}"
ZIP_PATH="${DIST_DIR}/${ZIP_NAME}"

if ! command -v zip >/dev/null 2>&1; then
    echo "Error: 'zip' is not installed. Install it via your package manager (apt, brew, etc.)." >&2
    exit 1
fi

rm -rf "$STAGING_DIR"
rm -f "$ZIP_PATH"
mkdir -p "$SKILL_STAGING/references"

cp "$SCRIPT_DIR/SKILL.md"                            "$SKILL_STAGING/SKILL.md"
cp "$SCRIPT_DIR/README.md"                           "$SKILL_STAGING/README.md"
cp "$SCRIPT_DIR/references/content-schema.md"        "$SKILL_STAGING/references/content-schema.md"
cp "$SCRIPT_DIR/references/page-schemas.md"          "$SKILL_STAGING/references/page-schemas.md"
cp "$SCRIPT_DIR/references/design-system.md"         "$SKILL_STAGING/references/design-system.md"
cp "$SCRIPT_DIR/references/code-patterns.md"         "$SKILL_STAGING/references/code-patterns.md"

find "$STAGING_DIR" -name ".DS_Store" -delete 2>/dev/null || true

(
    cd "$STAGING_DIR"
    zip -r -q "$ZIP_PATH" "$SKILL_NAME" \
        -x "*.DS_Store" \
        -x "*/.git/*" \
        -x "*/node_modules/*" \
        -x "*/.bun-cache/*" \
        -x "*/dist/*"
)

rm -rf "$STAGING_DIR"

if [ -f "$ZIP_PATH" ]; then
    SIZE=$(wc -c <"$ZIP_PATH" | tr -d ' ')
    echo "Built: $ZIP_PATH (${SIZE} bytes)"
else
    echo "Error: zip was not produced." >&2
    exit 1
fi
