'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navData from '@/data/nav.json';

interface NavItem {
  title: string;
  path: string;
  order?: number;
  children?: NavItem[];
}

export default function Sidebar() {
  const pathname = usePathname();
  const [nav, setNav] = useState<NavItem[]>([]);

  useEffect(() => {
    setNav(navData as NavItem[]);
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const active = isActive(item.path);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.path} style={{ marginBottom: level === 0 ? 'var(--space-2, 8px)' : 'var(--space-1, 4px)' }}>
        <Link
          href={item.path}
          style={{
            display: 'block',
            padding: 'var(--space-2, 8px) var(--space-3, 12px)',
            borderRadius: 'var(--radius-sm, 4px)',
            textDecoration: 'none',
            color: active
              ? 'var(--color-text-brand, #0d99ff)'
              : 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
            backgroundColor: active
              ? 'var(--color-bg-brand-selected, rgba(13, 153, 255, 0.1))'
              : 'transparent',
            fontWeight: active ? 600 : 400,
            fontSize: level === 0 ? '14px' : '13px',
            marginLeft: level > 0 ? `${level * 16}px` : '0',
          }}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <div style={{ marginTop: 'var(--space-1, 4px)' }}>
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      style={{
        width: '280px',
        minHeight: '100vh',
        padding: 'var(--space-4, 16px)',
        borderRight: '1px solid var(--color-border-default, #e6e6e6)',
        backgroundColor: 'var(--color-bg-secondary, #f5f5f5)',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <h2
        style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: 'var(--space-4, 16px)',
          color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
        }}
      >
        Documentation
      </h2>
      <nav>
        {nav.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}

