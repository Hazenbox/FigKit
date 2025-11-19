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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Lucide icons
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
    // UI Components
    Button,
    Badge,
    Avatar,
    ...components,
  };
}

