#!/usr/bin/env node

/**
 * Unified Development Server
 * 
 * Runs all apps locally with the same URL structure as production:
 * - http://localhost:5173/ → Docs
 * - http://localhost:5173/storybook → Storybook
 * - http://localhost:5173/test-npm → Sandbox (Test NPM page)
 * - http://localhost:5173/performance → Sandbox (Performance page)
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Detect repo root
let root = __dirname;
while (!existsSync(join(root, 'package.json'))) {
  const parent = join(root, '..');
  if (parent === root) break;
  root = parent;
}

console.log('🚀 Starting unified development server...\n');
console.log('📋 Available URLs:');
console.log('   http://localhost:5173/ → Docs');
console.log('   http://localhost:5173/storybook → Storybook');
console.log('   http://localhost:5173/test-npm → Test NPM');
console.log('   http://localhost:5173/performance → Performance\n');

// Start sandbox dev server (serves all routes)
console.log('🎨 Starting sandbox dev server on port 5173...\n');

const sandbox = spawn('pnpm', ['--filter', 'sandbox', 'dev'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});

sandbox.on('error', (error) => {
  console.error('❌ Failed to start sandbox:', error);
  process.exit(1);
});

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down dev server...');
  sandbox.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  sandbox.kill();
  process.exit(0);
});

