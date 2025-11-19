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

// Detect the actual repo root
// If we're in apps/docs/scripts/, go up 3 levels
// If we're in scripts/, go up 1 level
let rootDir = __dirname;
if (__dirname.includes('apps/docs')) {
  // We're in apps/docs/scripts/, go to repo root
  rootDir = join(__dirname, '../../..');
} else if (__dirname.endsWith('scripts')) {
  // We're in scripts/, go to repo root
  rootDir = join(__dirname, '..');
} else {
  // Default: assume we're in scripts/
  rootDir = join(__dirname, '..');
}

// Verify we're at the repo root by checking for package.json
const packageJsonPath = join(rootDir, 'package.json');
if (!existsSync(packageJsonPath)) {
  console.error('❌ Could not find repo root. Current dir:', __dirname);
  console.error('   Tried root:', rootDir);
  process.exit(1);
}

const outputDir = join(rootDir, '.vercel-output');

console.log('🚀 Starting unified build...\n');

// Step 1: Build tokens and themes
console.log('📦 Step 1: Building tokens and themes...');
execSync('pnpm mcp:pull:tokens', { cwd: rootDir, stdio: 'inherit' });
execSync('pnpm --filter @figkit/tokens build', { cwd: rootDir, stdio: 'inherit' });
execSync('pnpm --filter @figkit/themes prepublishOnly', { cwd: rootDir, stdio: 'inherit' });
execSync('pnpm --filter @figkit/ui build', { cwd: rootDir, stdio: 'inherit' });

// Step 2: Build Storybook to specific directory
console.log('\n📚 Step 2: Building Storybook...');
const storybookOutput = join(rootDir, 'packages/docs/storybook-static');
if (existsSync(storybookOutput)) {
  rmSync(storybookOutput, { recursive: true, force: true });
}
execSync(`pnpm --filter @figkit/docs build-storybook -o ${storybookOutput}`, { cwd: rootDir, stdio: 'inherit' });
const storybookBuildDir = join(rootDir, 'packages/docs/storybook-static');
if (!existsSync(storybookBuildDir)) {
  console.warn('⚠️  Storybook build directory not found. Expected:', storybookBuildDir);
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

// Copy docs build (main site) - copy contents to root, not to docs subdirectory
const docsBuild = join(rootDir, 'apps/docs/build');
if (existsSync(docsBuild)) {
  // Copy all files from docs build to output root
  const files = require('fs').readdirSync(docsBuild);
  files.forEach(file => {
    const srcPath = join(docsBuild, file);
    const destPath = join(outputDir, file);
    if (require('fs').statSync(srcPath).isDirectory()) {
      cpSync(srcPath, destPath, { recursive: true });
    } else {
      require('fs').copyFileSync(srcPath, destPath);
    }
  });
  console.log('✅ Copied docs build to root');
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
  
  // Fix asset paths in sandbox index.html to work from /sandbox/ subdirectory
  const fs = require('fs');
  const sandboxIndexHtml = join(outputDir, 'sandbox', 'index.html');
  if (existsSync(sandboxIndexHtml)) {
    let html = fs.readFileSync(sandboxIndexHtml, 'utf8');
    // Update asset paths to include /sandbox/ prefix
    html = html.replace(/href="\//g, 'href="/sandbox/');
    html = html.replace(/src="\//g, 'src="/sandbox/');
    fs.writeFileSync(sandboxIndexHtml, html, 'utf8');
    console.log('✅ Updated asset paths in sandbox index.html');
  }
} else {
  console.error('❌ Sandbox build not found at:', sandboxBuild);
  process.exit(1);
}

console.log('\n✨ Unified build complete!');
console.log('📂 Output directory:', outputDir);
console.log('\nDirectory structure:');
console.log('  /                    -> Docs app (from apps/docs/build)');
console.log('  /storybook-static/   -> Storybook (served at /storybook/*)');
console.log('  /sandbox/            -> Sandbox app (served at /test-npm, /performance)');

