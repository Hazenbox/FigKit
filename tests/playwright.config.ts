import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { 
    baseURL: 'http://localhost:6006', 
    screenshot: 'only-on-failure' 
  },
  projects: [{ 
    name: 'chromium', 
    use: { ...devices['Desktop Chrome'] } 
  }],
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report' }]
  ]
});

