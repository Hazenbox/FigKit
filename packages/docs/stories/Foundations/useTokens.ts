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
        // Use fetch with absolute path to tokens directory
        const tokensPath = `/node_modules/@figkit/tokens/dist/${b}.${t}.json`;
        const response = await fetch(tokensPath);
        if (!response.ok) {
          // Try alternative path
          const altPath = `/packages/tokens/dist/${b}.${t}.json`;
          const altResponse = await fetch(altPath);
          if (!altResponse.ok) throw new Error(`HTTP ${altResponse.status}`);
          const data = await altResponse.json();
          setTokens(data);
        } else {
          const data = await response.json();
          setTokens(data);
        }
      } catch (error) {
        console.warn(`Failed to load tokens for ${b}.${t}:`, error);
        // Fallback to default
        try {
          const response = await fetch(`/packages/tokens/dist/default.light.json`);
          if (response.ok) {
            const data = await response.json();
            setTokens(data);
          } else {
            setTokens({});
          }
        } catch {
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
