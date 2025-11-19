// Environment configuration for docs
// This file provides environment-aware URLs for external resources

// All apps are now served from the same domain with different paths:
// - / -> Docs app
// - /storybook -> Storybook
// - /test-npm -> Sandbox test page
// - /performance -> Sandbox performance page

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Use current origin (same domain)
    return window.location.origin;
  }
  // Fallback for SSR
  return process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : process.env.STORYBOOK_URL?.replace('/storybook', '') || 'https://fig-kit.vercel.app';
};

const baseUrl = getBaseUrl();

export const config = {
  // All URLs are on the same domain, just different paths
  storybookUrl: `${baseUrl}/storybook`,
  sandboxUrl: baseUrl,
  performanceUrl: `${baseUrl}/performance`,
  get testNpmUrl() {
    return `${this.sandboxUrl}/test-npm`;
  },
};

