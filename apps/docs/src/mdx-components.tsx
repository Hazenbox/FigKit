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
import { Button, Badge, Avatar, Checkbox, Tab, Tabs, TextInput } from '@figkit/ui';

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
    Avatar,
    Checkbox,
    Tab,
    Tabs,
    TextInput,
    ...components,
  };
}

