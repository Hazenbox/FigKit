import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Helper to check if a URL should be handled by Vite (not proxied)
const isViteAsset = (url: string): boolean => {
  if (!url) return false;
  
  // Sandbox routes handled by React Router
  if (url === '/test-npm' || url === '/performance' || url.startsWith('/test-npm/') || url.startsWith('/performance/')) {
    return true;
  }
  
  // Vite internal assets and source files
  // Check for JS files first (including main.js, runtime~main.js, etc.)
  if (url.endsWith('.js') && !url.includes('.json')) {
    return true;
  }
  
  // Vite dev server assets
  return (
    url.startsWith('/src/') ||
    url.startsWith('/@vite/') ||
    url.startsWith('/@id/') ||
    url.startsWith('/@react-refresh') ||
    url.startsWith('/@fs/') ||
    url.startsWith('/node_modules/.vite/') ||
    url.startsWith('/vite.svg') ||
    url.match(/\.(tsx?|jsx?|css|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/) ||
    url === '/index.html' ||
    url === '/favicon.ico'
  );
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin to handle CSS imports from aliased packages
    {
      name: 'resolve-css-aliases',
      enforce: 'pre',
      resolveId(id) {
        // Handle CSS imports for @figkit/ui - return the source CSS file
        if (id === '@figkit/ui/dist/index.css' || id === '@figkit/ui/index.css') {
          return path.resolve(__dirname, '../../packages/ui/src/index.css');
        }
        return null;
      },
    },
  ],
  server: {
    port: 5173,
    proxy: {
      // Proxy Storybook requests to Storybook dev server (must come first)
      // Storybook runs at root (/) in dev mode, so we strip /storybook prefix
      '/storybook': {
        target: 'http://localhost:6006',
        changeOrigin: true,
        rewrite: (path) => {
          // Remove /storybook prefix, but keep trailing slash for root
          const rewritten = path.replace(/^\/storybook/, '');
          return rewritten || '/';
        },
        ws: true, // Enable WebSocket for HMR
      },
      // Proxy Storybook iframe routes (internal Storybook routes)
      '/iframe.html': {
        target: 'http://localhost:6006',
        changeOrigin: true,
        ws: true,
      },
      // Proxy Storybook assets (sb-manager, sb-addons)
      '/sb-manager': {
        target: 'http://localhost:6006',
        changeOrigin: true,
        ws: true,
      },
      '/sb-addons': {
        target: 'http://localhost:6006',
        changeOrigin: true,
        ws: true,
      },
      // Proxy Storybook static assets
      '/sb-common-assets': {
        target: 'http://localhost:6006',
        changeOrigin: true,
      },
      '/node_modules': {
        target: 'http://localhost:6006',
        changeOrigin: true,
        // Don't proxy Vite's internal dependency pre-bundling files
        bypass: (req) => {
          const url = req.url || '';
          // Vite's dependency pre-bundling files must be served by Vite
          if (url.startsWith('/node_modules/.vite/')) {
            return req.url;
          }
          return null;
        },
      },
      // Proxy token JSON files (used by Storybook stories)
      '/packages/tokens/dist': {
        target: 'http://localhost:6006',
        changeOrigin: true,
      },
      // Proxy docs requests to Docusaurus dev server
      '/docs': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/docs/, ''),
      },
      // Proxy root to docs app (overview page)
      // Note: /test-npm and /performance are handled by React Router in sandbox app
      '/': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: () => '/overview',
        // Don't proxy if it's a sandbox route or Vite internal assets
        bypass: (req) => {
          return isViteAsset(req.url || '') ? req.url : null;
        },
      },
      // Proxy other docs paths (but exclude Storybook, sandbox routes, and Vite assets)
      // This catches paths like /getting-started, /components, etc.
      '^/(?!storybook|test-npm|performance|sandbox|sb-|iframe\\.html|index\\.json|favicon\\.svg|packages|node_modules|docs|src|@vite|@id|@react-refresh|@fs).*': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Don't proxy sandbox routes or Vite assets
        bypass: (req) => {
          return isViteAsset(req.url || '') ? req.url : null;
        },
      },
    },
  },
  base: '/',
  resolve: {
    alias: {
      '@figkit/themes': path.resolve(__dirname, '../../packages/themes'),
      '@figkit/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
    // Ensure we resolve from source in dev mode
    conditions: ['import', 'module', 'browser', 'default'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})
