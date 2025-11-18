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
        const module = await import(`@figkit/tokens/${b}.${t}.json`);
        setTokens(module.default || module);
      } catch (error) {
        console.warn(`Failed to load tokens for ${b}.${t}:`, error);
        // Fallback to default
        try {
          const module = await import(`@figkit/tokens/default.light.json`);
          setTokens(module.default || module);
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
