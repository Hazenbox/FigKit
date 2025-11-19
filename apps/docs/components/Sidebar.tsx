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
      <div key={item.path} style={{ marginBottom: level === 0 ? '8px' : '4px' }}>
        <Link
          href={item.path}
          style={{
            display: 'block',
            padding: '8px 12px',
            borderRadius: '4px',
            textDecoration: 'none',
            color: active ? '#2563eb' : 'rgb(var(--foreground-rgb))',
            backgroundColor: active ? '#eff6ff' : 'transparent',
            fontWeight: active ? 600 : 400,
            fontSize: level === 0 ? '14px' : '13px',
            marginLeft: level > 0 ? `${level * 16}px` : '0',
          }}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <div style={{ marginTop: '4px' }}>
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
        padding: '16px',
        borderRight: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
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
          marginBottom: '16px',
          color: 'rgb(var(--foreground-rgb))',
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

