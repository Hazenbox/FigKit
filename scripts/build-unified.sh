#!/bin/bash

# Unified Build Script for Vercel
# This script builds all apps and organizes them for unified deployment

set -e  # Exit on error

echo "🚀 Starting unified build..."
echo ""

# Step 1: Build tokens and themes
echo "📦 Step 1: Building tokens and themes..."
pnpm mcp:pull:tokens
pnpm --filter @figkit/tokens build
pnpm --filter @figkit/themes prepublishOnly
pnpm --filter @figkit/ui build

# Step 2: Build Storybook to specific directory
echo ""
echo "📚 Step 2: Building Storybook..."
STORYBOOK_OUTPUT="packages/docs/storybook-static"
rm -rf "$STORYBOOK_OUTPUT"
pnpm --filter @figkit/docs build-storybook -o "$STORYBOOK_OUTPUT"

# Step 3: Build sandbox
echo ""
echo "🎨 Step 3: Building sandbox app..."
pnpm --filter sandbox build

# Step 4: Build docs
echo ""
echo "📖 Step 4: Building docs app..."
cd apps/docs && pnpm build && cd ../..

# Step 5: Create unified output directory
echo ""
echo "📁 Step 5: Organizing output directory..."

OUTPUT_DIR=".vercel-output"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Copy docs build (main site) - this will be served at /
if [ -d "apps/docs/build" ]; then
  cp -r apps/docs/build/* "$OUTPUT_DIR/"
  echo "✅ Copied docs build"
else
  echo "❌ Docs build not found!"
  exit 1
fi

# Copy Storybook build to storybook-static subdirectory
if [ -d "packages/docs/storybook-static" ]; then
  mkdir -p "$OUTPUT_DIR/storybook-static"
  cp -r packages/docs/storybook-static/* "$OUTPUT_DIR/storybook-static/"
  echo "✅ Copied Storybook build"
elif [ -d "storybook-static" ]; then
  mkdir -p "$OUTPUT_DIR/storybook-static"
  cp -r storybook-static/* "$OUTPUT_DIR/storybook-static/"
  echo "✅ Copied Storybook build (from root)"
else
  echo "⚠️  Storybook build not found (this is OK if Storybook isn't needed)"
fi

# Copy sandbox build to sandbox subdirectory
if [ -d "apps/sandbox/dist" ]; then
  mkdir -p "$OUTPUT_DIR/sandbox"
  cp -r apps/sandbox/dist/* "$OUTPUT_DIR/sandbox/"
  echo "✅ Copied sandbox build"
else
  echo "❌ Sandbox build not found!"
  exit 1
fi

echo ""
echo "✨ Unified build complete!"
echo "📂 Output directory: $OUTPUT_DIR"
echo ""
echo "Directory structure:"
echo "  /                    -> Docs app (from apps/docs/build)"
echo "  /storybook-static/  -> Storybook (served at /storybook/* via rewrite)"
echo "  /sandbox/           -> Sandbox app (served at /test-npm, /performance via rewrite)"

