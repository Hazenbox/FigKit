import type { MDXComponents } from 'mdx/types';
import { Button, Badge } from '@figkit/ui';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Button,
    Badge,
    ...components,
  };
}

