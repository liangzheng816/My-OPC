#!/usr/bin/env sh
# Package the create-infographics skill into a portable zip archive.
#
# Includes the bundled deps (baoyu-image-gen + baoyu-infographic), so the
# resulting zip is fully self-contained — the recipient only needs `bun`
# (or `npx`) and an image-gen API key.
#
# Usage:
#   ./package.sh             -> dist/create-infographics.zip
#   ./package.sh v1.0.0      -> dist/create-infographics-v1.0.0.zip

set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_NAME="create-infographics"
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
mkdir -p "$SKILL_STAGING"

# Copy everything except dist/ itself (avoid recursive packaging).
# Using rsync-style filter via tar pipe so .DS_Store / node_modules / .bun-cache are excluded.
(
    cd "$SCRIPT_DIR"
    tar --exclude='./dist' \
        --exclude='*/node_modules' \
        --exclude='*/.bun-cache' \
        --exclude='.DS_Store' \
        --exclude='*/__pycache__' \
        -cf - . | tar -xf - -C "$SKILL_STAGING"
)

(
    cd "$STAGING_DIR"
    zip -r -q "$ZIP_PATH" "$SKILL_NAME"
)

rm -rf "$STAGING_DIR"

if [ -f "$ZIP_PATH" ]; then
    SIZE=$(wc -c <"$ZIP_PATH" | tr -d ' ')
    HUMAN=$(numfmt --to=iec "$SIZE" 2>/dev/null || echo "${SIZE} bytes")
    echo "Built: $ZIP_PATH ($HUMAN)"
else
    echo "Error: zip was not produced." >&2
    exit 1
fi
