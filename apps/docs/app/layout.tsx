import type { Metadata } from 'next';
import '@figkit/themes/dist/tokens.css';
import '@figkit/ui/dist/index.css';
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
    <html lang="en" data-brand="default" data-theme="light">
      <body>{children}</body>
    </html>
  );
}

