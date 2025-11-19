#!/bin/bash

# Unified Development Server Script
# Runs all apps locally with unified URL structure matching production

set -e

echo "🚀 Starting unified development environment..."
echo ""
echo "📋 Available URLs (same as production):"
echo "   http://localhost:5173/ → Docs (Overview page)"
echo "   http://localhost:5173/docs → Documentation"
echo "   http://localhost:5173/storybook → Storybook (proxied to :6006)"
echo "   http://localhost:5173/test-npm → Test NPM"
echo "   http://localhost:5173/performance → Performance"
echo ""
echo "💡 Services:"
echo "   - Sandbox (main): http://localhost:5173"
echo "   - Storybook: http://localhost:6006 (proxied via /storybook)"
echo "   - Docs: http://localhost:3001 (proxied via / and /docs)"
echo ""

# Start Storybook in background
echo "📚 Starting Storybook on port 6006..."
pnpm --filter @figkit/docs storybook > /dev/null 2>&1 &
STORYBOOK_PID=$!

# Start Docs in background
echo "📖 Starting Docs on port 3001..."
pnpm --filter @figkit/docs-app dev > /dev/null 2>&1 &
DOCS_PID=$!

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 8

# Check if services are running
if ! kill -0 $STORYBOOK_PID 2>/dev/null; then
  echo "⚠️  Storybook failed to start"
fi

if ! kill -0 $DOCS_PID 2>/dev/null; then
  echo "⚠️  Docs failed to start"
fi

# Start sandbox dev server (main server on port 5173)
echo ""
echo "🎨 Starting sandbox dev server on port 5173..."
echo "   (This is your main entry point - all routes are proxied here)"
echo ""

# Cleanup function
cleanup() {
  echo ""
  echo "🛑 Shutting down servers..."
  kill $STORYBOOK_PID 2>/dev/null || true
  kill $DOCS_PID 2>/dev/null || true
  exit 0
}

trap cleanup SIGINT SIGTERM

# Start sandbox (foreground - this will block)
pnpm --filter sandbox dev

