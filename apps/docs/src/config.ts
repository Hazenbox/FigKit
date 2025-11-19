// Environment configuration for docs
// This file provides environment-aware URLs for external resources

export const config = {
  storybookUrl: 
    typeof window !== 'undefined' 
      ? (window as any).__STORYBOOK_URL__ || process.env.STORYBOOK_URL || 'https://storybook.figkit.dev'
      : process.env.STORYBOOK_URL || 'https://storybook.figkit.dev',
  
  sandboxUrl: 
    typeof window !== 'undefined'
      ? (window as any).__SANDBOX_URL__ || process.env.SANDBOX_URL || 'https://figkit.dev'
      : process.env.SANDBOX_URL || 'https://figkit.dev',
  
  performanceUrl:
    typeof window !== 'undefined'
      ? (window as any).__PERFORMANCE_URL__ || process.env.PERFORMANCE_URL || 'https://figkit.dev/performance'
      : process.env.PERFORMANCE_URL || 'https://figkit.dev/performance',
};

