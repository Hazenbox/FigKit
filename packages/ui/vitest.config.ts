import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { 
    environment: 'jsdom', 
    setupFiles: ['./vitest.setup.ts'], 
    globals: true 
  },
  projects: [
    {
      name: 'unit',
      test: {
        include: ['**/*.spec.ts', '**/*.spec.tsx'],
        exclude: ['**/*.a11y.spec.ts', '**/*.a11y.spec.tsx']
      }
    },
    {
      name: 'a11y',
      test: {
        include: ['**/*.a11y.spec.ts', '**/*.a11y.spec.tsx']
      }
    }
  ]
});

