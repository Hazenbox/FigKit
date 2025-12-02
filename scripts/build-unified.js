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
import { existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync, copyFileSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Detect the actual repo root
// Strategy: Start from script location and walk up until we find package.json
let rootDir = __dirname;
let attempts = 0;
const maxAttempts = 5;

// Walk up the directory tree to find repo root (where package.json exists)
while (attempts < maxAttempts) {
  const packageJsonPath = join(rootDir, 'package.json');
  if (existsSync(packageJsonPath)) {
    // Found it!
    break;
  }
  // Go up one level
  const parentDir = join(rootDir, '..');
  if (parentDir === rootDir) {
    // Can't go up anymore
    break;
  }
  rootDir = parentDir;
  attempts++;
}

// Verify we found the repo root
const packageJsonPath = join(rootDir, 'package.json');
if (!existsSync(packageJsonPath)) {
  console.error('❌ Could not find repo root!');
  console.error('   Script location:', __dirname);
  console.error('   Current working directory:', process.cwd());
  console.error('   Tried root:', rootDir);
  console.error('   Please ensure Root Directory in Vercel is set to "." (repo root)');
  process.exit(1);
}

console.log('📂 Detected repo root:', rootDir);

const outputDir = join(rootDir, '.vercel-output');

console.log('🚀 Starting unified build...\n');

// Step 1: Build tokens and themes
console.log('📦 Step 1: Building tokens and themes...');

// Check if token files already exist (they're committed to git)
const tokensDir = join(rootDir, 'packages/tokens/dist');
const tokenFilesExist = existsSync(tokensDir) && 
  readdirSync(tokensDir).some(f => f.endsWith('.json'));

if (tokenFilesExist) {
  console.log('✅ Token files already exist, skipping token generation');
} else {
  console.log('⚠️  Token files not found, generating...');
  try {
    execSync('pnpm mcp:pull:tokens', { cwd: rootDir, stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Token generation failed. Make sure token files are committed to git.');
    console.error('   Run: pnpm mcp:pull:tokens && git add packages/tokens/dist/ && git commit');
    process.exit(1);
  }
}

execSync('pnpm --filter @figkit/tokens build', { cwd: rootDir, stdio: 'inherit' });
execSync('pnpm --filter @figkit/themes prepublishOnly', { cwd: rootDir, stdio: 'inherit' });
execSync('pnpm --filter @figkit/ui build', { cwd: rootDir, stdio: 'inherit' });

// Step 2: Build patterns package (needed by Storybook)
console.log('\n📦 Step 2: Building patterns package...');
try {
  execSync('pnpm --filter @figkit/patterns build', { cwd: rootDir, stdio: 'inherit' });
  console.log('✅ Patterns package built');
} catch (error) {
  console.warn('⚠️  Patterns package build failed or not found, continuing...');
}

// Step 3: Build Storybook to specific directory
console.log('\n📚 Step 3: Building Storybook...');
const storybookOutput = join(rootDir, 'packages/docs/storybook-static');
if (existsSync(storybookOutput)) {
  rmSync(storybookOutput, { recursive: true, force: true });
}
execSync(`pnpm --filter @figkit/docs build-storybook -o ${storybookOutput}`, { cwd: rootDir, stdio: 'inherit' });
const storybookBuildDir = join(rootDir, 'packages/docs/storybook-static');
if (!existsSync(storybookBuildDir)) {
  console.warn('⚠️  Storybook build directory not found. Expected:', storybookBuildDir);
}

// Step 4: Build sandbox
console.log('\n🎨 Step 4: Building sandbox app...');
execSync('pnpm --filter sandbox build', { cwd: rootDir, stdio: 'inherit' });

// Step 5: Build docs
console.log('\n📖 Step 5: Building docs app...');
execSync('cd apps/docs && pnpm build', { cwd: rootDir, stdio: 'inherit' });

// Step 6: Organize output directory
console.log('\n📁 Step 6: Organizing output directory...');
if (existsSync(outputDir)) {
  rmSync(outputDir, { recursive: true, force: true });
}
mkdirSync(outputDir, { recursive: true });

// Copy docs build (main site) - copy contents to root, not to docs subdirectory
const docsBuild = join(rootDir, 'apps/docs/build');
if (existsSync(docsBuild)) {
  // Copy all files from docs build to output root
  const files = readdirSync(docsBuild);
  for (const file of files) {
    const srcPath = join(docsBuild, file);
    const destPath = join(outputDir, file);
    const stat = statSync(srcPath);
    if (stat.isDirectory()) {
      cpSync(srcPath, destPath, { recursive: true });
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
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
  
  // Verify critical Storybook files exist
  const storybookIndex = join(outputDir, 'storybook-static', 'index.html');
  const storybookIndexJson = join(outputDir, 'storybook-static', 'index.json');
  if (!existsSync(storybookIndex)) {
    console.warn('⚠️  Storybook index.html not found!');
  }
  if (!existsSync(storybookIndexJson)) {
    console.warn('⚠️  Storybook index.json not found!');
  } else {
    console.log('✅ Storybook index.json found');
  }
  
  // Copy token JSON files into Storybook build so they're accessible
  const tokensDistDir = join(rootDir, 'packages/tokens/dist');
  if (existsSync(tokensDistDir)) {
    const storybookTokensDir = join(outputDir, 'storybook-static', 'packages', 'tokens', 'dist');
    mkdirSync(storybookTokensDir, { recursive: true });
    
    // Copy all JSON files from tokens/dist to Storybook build
    const tokenFiles = readdirSync(tokensDistDir).filter(file => file.endsWith('.json'));
    for (const file of tokenFiles) {
      const srcPath = join(tokensDistDir, file);
      const destPath = join(storybookTokensDir, file);
      copyFileSync(srcPath, destPath);
    }
    console.log(`✅ Copied ${tokenFiles.length} token JSON files to Storybook build`);
  }
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
  const sandboxIndexHtml = join(outputDir, 'sandbox', 'index.html');
  if (existsSync(sandboxIndexHtml)) {
    let html = readFileSync(sandboxIndexHtml, 'utf8');
    // Update asset paths to include /sandbox/ prefix
    html = html.replace(/href="\//g, 'href="/sandbox/');
    html = html.replace(/src="\//g, 'src="/sandbox/');
    writeFileSync(sandboxIndexHtml, html, 'utf8');
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

