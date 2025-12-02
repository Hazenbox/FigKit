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
import CodePreview from './components/CodePreview';
import ComponentPlayground from './components/ComponentPlayground';
import PropsPlayground from './components/PropsPlayground';
import TOCAligner from './components/TOCAligner';

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
    CodePreview,
    ComponentPlayground,
    PropsPlayground,
    TOCAligner,
    ...components,
  };
}

