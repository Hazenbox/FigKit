import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
        // Don't proxy if it's a sandbox route (let React Router handle it)
        bypass: (req) => {
          if (req.url === '/test-npm' || req.url === '/performance') {
            return req.url;
          }
          return null;
        },
      },
      // Proxy other docs paths (but exclude Storybook, sandbox routes)
      // This catches paths like /getting-started, /components, etc.
      '^/(?!storybook|test-npm|performance|sandbox|sb-|iframe\\.html|index\\.json|favicon\\.svg|packages|node_modules|docs).*': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Don't proxy sandbox routes
        bypass: (req) => {
          if (req.url === '/test-npm' || req.url === '/performance') {
            return req.url;
          }
          return null;
        },
      },
    },
  },
  base: '/',
  resolve: {
    alias: {
      '@figkit/themes': path.resolve(__dirname, '../../packages/themes'),
      '@figkit/ui': path.resolve(__dirname, '../../packages/ui'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})
