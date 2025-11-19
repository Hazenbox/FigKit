// Environment configuration for docs
// This file provides environment-aware URLs for external resources

export const config = {
  storybookUrl: 
    typeof window !== 'undefined' 
      ? (window as any).__STORYBOOK_URL__ || process.env.STORYBOOK_URL || 'https://fig-kit.vercel.app/storybook'
      : process.env.STORYBOOK_URL || 'https://fig-kit.vercel.app/storybook',
  
  sandboxUrl: 
    typeof window !== 'undefined'
      ? (window as any).__SANDBOX_URL__ || process.env.SANDBOX_URL || 'https://fig-kit.vercel.app'
      : process.env.SANDBOX_URL || 'https://fig-kit.vercel.app',
  
  performanceUrl:
    typeof window !== 'undefined'
      ? (window as any).__PERFORMANCE_URL__ || process.env.PERFORMANCE_URL || 'https://fig-kit.vercel.app/performance'
      : process.env.PERFORMANCE_URL || 'https://fig-kit.vercel.app/performance',
};

