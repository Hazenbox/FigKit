#!/bin/bash
echo "Clearing all Storybook and Vite caches..."
rm -rf node_modules/.cache
rm -rf node_modules/.vite
rm -rf .storybook-static
echo "✅ All caches cleared!"
