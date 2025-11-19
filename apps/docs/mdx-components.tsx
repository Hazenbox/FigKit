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
    ...components,
  };
}

