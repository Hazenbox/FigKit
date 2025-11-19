'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import lunr from 'lunr';

interface SearchResult {
  title: string;
  path: string;
  description?: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<lunr.Index | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => {
        const idx = lunr.Index.load(data);
        setIndex(idx);
      })
      .catch(() => {
        // Search index not available
      });
  }, []);

  useEffect(() => {
    if (!index || !query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    try {
      const searchResults = index.search(query);
      const resultsWithData: SearchResult[] = searchResults
        .slice(0, 10)
        .map((result) => {
          const doc = index.documentStore.get(result.ref);
          return {
            title: doc?.title || '',
            path: doc?.path || '',
            description: doc?.description || '',
          };
        })
        .filter((r) => r.title && r.path);

      setResults(resultsWithData);
      setIsOpen(resultsWithData.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setIsOpen(false);
    }
  }, [query, index]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} style={{ position: 'relative', marginBottom: '16px' }}>
      <input
        type="search"
        placeholder="Search documentation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          color: 'rgb(var(--foreground-rgb))',
          fontSize: '14px',
        }}
      />
      {isOpen && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {results.map((result) => (
            <Link
              key={result.path}
              href={result.path}
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                padding: '12px',
                textDecoration: 'none',
                color: 'rgb(var(--foreground-rgb))',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                {result.title}
              </div>
              {result.description && (
                <div
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                }}
                >
                  {result.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

