import type { MDXComponents } from 'mdx/types';
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
  Layers
} from 'lucide-react';
import { Button, Badge } from '@figkit/ui';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    Button,
    Badge,
    ...components,
  };
}

