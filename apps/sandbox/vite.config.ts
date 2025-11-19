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
