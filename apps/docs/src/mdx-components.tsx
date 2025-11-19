import type { MDXComponents } from 'mdx/types';
import React from 'react';
import { 
  BookOpen, 
  Rocket, 
  Package, 
  Palette, 
  Code, 
  Zap, 
  Github,
  ExternalLink,
  FileText,
  Settings,
  Layers,
  Download,
  CheckCircle,
  AlertCircle,
  Info,
  ColorSwatch,
  Type,
  Spacing
} from 'lucide-react';
import { Button, Badge, Avatar } from '@figkit/ui';

// This function is automatically called by Docusaurus to provide components to MDX files
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Lucide icons - pass directly
    BookOpen,
    Rocket,
    Package,
    Palette,
    Code,
    Zap,
    Github,
    ExternalLink,
    FileText,
    Settings,
    Layers,
    Download,
    CheckCircle,
    AlertCircle,
    Info,
    ColorSwatch,
    Type,
    Spacing,
    // UI Components from @figkit/ui
    Button,
    Badge,
    Avatar,
    // Spread existing components to allow overrides
    ...components,
  };
}

