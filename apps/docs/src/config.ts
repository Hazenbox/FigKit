// Environment configuration for docs
// This file provides environment-aware URLs for external resources

// Note: These URLs should point to the sandbox app deployment, not the docs app
// The sandbox app contains the /test-npm, /performance, and /storybook routes
// If sandbox and docs are on the same domain, use relative paths
// If they're separate deployments, use full URLs

const getEnvUrl = (envVar: string, defaultPath: string): string => {
  if (typeof window !== 'undefined') {
    return (window as any)[`__${envVar}__`] || process.env[envVar] || defaultPath;
  }
  return process.env[envVar] || defaultPath;
};

export const config = {
  // Storybook URL - should point to Storybook deployment or sandbox /storybook route
  storybookUrl: getEnvUrl('STORYBOOK_URL', '#'),
  
  // Sandbox base URL - where the sandbox app is deployed
  sandboxUrl: getEnvUrl('SANDBOX_URL', '#'),
  
  // Performance benchmarks URL
  performanceUrl: getEnvUrl('PERFORMANCE_URL', '#'),
  
  // Test NPM package URL (derived from sandboxUrl)
  get testNpmUrl() {
    return this.sandboxUrl === '#' ? '#' : `${this.sandboxUrl}/test-npm`;
  },
};

