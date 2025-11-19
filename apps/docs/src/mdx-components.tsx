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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Lucide icons
    BookOpen: (props: any) => <BookOpen {...props} />,
    Rocket: (props: any) => <Rocket {...props} />,
    Package: (props: any) => <Package {...props} />,
    Palette: (props: any) => <Palette {...props} />,
    Code: (props: any) => <Code {...props} />,
    Zap: (props: any) => <Zap {...props} />,
    Github: (props: any) => <Github {...props} />,
    ExternalLink: (props: any) => <ExternalLink {...props} />,
    FileText: (props: any) => <FileText {...props} />,
    Settings: (props: any) => <Settings {...props} />,
    Layers: (props: any) => <Layers {...props} />,
    Download: (props: any) => <Download {...props} />,
    CheckCircle: (props: any) => <CheckCircle {...props} />,
    AlertCircle: (props: any) => <AlertCircle {...props} />,
    Info: (props: any) => <Info {...props} />,
    ColorSwatch: (props: any) => <ColorSwatch {...props} />,
    Type: (props: any) => <Type {...props} />,
    Spacing: (props: any) => <Spacing {...props} />,
    ...components,
  };
}

