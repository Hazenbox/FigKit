import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FigKit Design System - Documentation',
  description: 'Comprehensive documentation for the FigKit Design System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

