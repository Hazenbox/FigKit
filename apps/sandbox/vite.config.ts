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
      // Proxy Storybook requests to Storybook dev server
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
      // Proxy docs requests to Docusaurus dev server
      '/docs': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/docs/, ''),
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
