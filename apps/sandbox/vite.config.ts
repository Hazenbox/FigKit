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
      '/storybook': {
        target: 'http://localhost:6006',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/storybook/, ''),
        ws: true, // Enable WebSocket for HMR
      },
      // Proxy Storybook assets (sb-manager, sb-addons)
      '/sb-manager': {
        target: 'http://localhost:6006',
        changeOrigin: true,
      },
      '/sb-addons': {
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
