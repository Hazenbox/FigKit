#!/usr/bin/env node

/**
 * Unified Build Script for Vercel
 * 
 * This script builds all apps and organizes them into a single output directory
 * that Vercel can serve with proper routing.
 * 
 * Structure:
 * - / (root) -> docs app
 * - /storybook/* -> Storybook static build
 * - /test-npm -> sandbox app
 * - /performance -> sandbox app
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const outputDir = join(rootDir, '.vercel-output');

console.log('🚀 Starting unified build...\n');

// Step 1: Build tokens and themes
console.log('📦 Step 1: Building tokens and themes...');
execSync('pnpm mcp:pull:tokens', { cwd: rootDir, stdio: 'inherit' });
execSync('pnpm --filter @figkit/tokens build', { cwd: rootDir, stdio: 'inherit' });
execSync('pnpm --filter @figkit/themes prepublishOnly', { cwd: rootDir, stdio: 'inherit' });
execSync('pnpm --filter @figkit/ui build', { cwd: rootDir, stdio: 'inherit' });

// Step 2: Build Storybook
console.log('\n📚 Step 2: Building Storybook...');
const storybookOutput = join(rootDir, 'packages/docs/storybook-static');
if (existsSync(storybookOutput)) {
  rmSync(storybookOutput, { recursive: true, force: true });
}
execSync('pnpm --filter @figkit/docs build-storybook', { cwd: rootDir, stdio: 'inherit' });
// Storybook builds to packages/docs/storybook-static by default, but we need to check
const storybookBuildDir = join(rootDir, 'packages/docs/storybook-static');
if (!existsSync(storybookBuildDir)) {
  // Try alternative location
  const altDir = join(rootDir, 'packages/docs/dist-storybook');
  if (existsSync(altDir)) {
    cpSync(altDir, storybookBuildDir, { recursive: true });
  } else {
    console.warn('⚠️  Storybook build directory not found. Expected:', storybookBuildDir);
  }
}

// Step 3: Build sandbox
console.log('\n🎨 Step 3: Building sandbox app...');
execSync('pnpm --filter sandbox build', { cwd: rootDir, stdio: 'inherit' });

// Step 4: Build docs
console.log('\n📖 Step 4: Building docs app...');
execSync('cd apps/docs && pnpm build', { cwd: rootDir, stdio: 'inherit' });

// Step 5: Organize output directory
console.log('\n📁 Step 5: Organizing output directory...');
if (existsSync(outputDir)) {
  rmSync(outputDir, { recursive: true, force: true });
}
mkdirSync(outputDir, { recursive: true });

// Copy docs build (main site)
const docsBuild = join(rootDir, 'apps/docs/build');
if (existsSync(docsBuild)) {
  cpSync(docsBuild, join(outputDir, 'docs'), { recursive: true });
  console.log('✅ Copied docs build');
} else {
  console.error('❌ Docs build not found at:', docsBuild);
  process.exit(1);
}

// Copy Storybook build
if (existsSync(storybookBuildDir)) {
  mkdirSync(join(outputDir, 'storybook-static'), { recursive: true });
  cpSync(storybookBuildDir, join(outputDir, 'storybook-static'), { recursive: true });
  console.log('✅ Copied Storybook build');
} else {
  console.warn('⚠️  Storybook build not found');
}

// Copy sandbox build
const sandboxBuild = join(rootDir, 'apps/sandbox/dist');
if (existsSync(sandboxBuild)) {
  mkdirSync(join(outputDir, 'sandbox'), { recursive: true });
  cpSync(sandboxBuild, join(outputDir, 'sandbox'), { recursive: true });
  console.log('✅ Copied sandbox build');
} else {
  console.error('❌ Sandbox build not found at:', sandboxBuild);
  process.exit(1);
}

console.log('\n✨ Unified build complete!');
console.log('📂 Output directory:', outputDir);
console.log('\nDirectory structure:');
console.log('  /docs/          -> Docs app (served at /)');
console.log('  /storybook-static/ -> Storybook (served at /storybook/*)');
console.log('  /sandbox/       -> Sandbox app (served at /test-npm, /performance)');

