import { useEffect, useState } from 'react';

export function useTokens() {
  const [brand, setBrand] = useState('default');
  const [theme, setTheme] = useState('light');
  const [tokens, setTokens] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const loadTokens = async (b: string, t: string) => {
      try {
        setLoading(true);
        // Try /packages/tokens/dist first (works in both dev and production)
        const tokensPath = `/packages/tokens/dist/${b}.${t}.json`;
        const response = await fetch(tokensPath);
        
        if (!response.ok) {
          // Try alternative path
          const altPath = `/node_modules/@figkit/tokens/dist/${b}.${t}.json`;
          const altResponse = await fetch(altPath);
          if (!altResponse.ok) {
            throw new Error(`HTTP ${altResponse.status}: Failed to load tokens`);
          }
          const data = await altResponse.json();
          setTokens(data);
        } else {
          // Check if response is actually JSON (not HTML error page)
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
          }
          const data = await response.json();
          setTokens(data);
        }
      } catch (error) {
        console.warn(`Failed to load tokens for ${b}.${t}:`, error);
        // Fallback to default
        try {
          const response = await fetch(`/packages/tokens/dist/default.light.json`);
          if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              setTokens(data);
            } else {
              console.warn('Fallback response is not JSON');
              setTokens({});
            }
          } else {
            setTokens({});
          }
        } catch (fallbackError) {
          console.warn('Fallback token load failed:', fallbackError);
          setTokens({});
        }
      } finally {
        setLoading(false);
      }
    };

    const updateFromDOM = () => {
      const currentBrand = document.documentElement.getAttribute('data-brand') || 'default';
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setBrand(currentBrand);
      setTheme(currentTheme);
      loadTokens(currentBrand, currentTheme);
    };

    updateFromDOM();

    const observer = new MutationObserver(updateFromDOM);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-brand', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return { brand, theme, tokens, loading };
}
