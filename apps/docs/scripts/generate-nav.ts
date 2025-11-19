import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { join, relative, dirname } from 'path';
import matter from 'gray-matter';
import { writeFileSync, mkdirSync } from 'fs';

interface NavItem {
  title: string;
  path: string;
  order?: number;
  children?: NavItem[];
}

const contentDir = join(process.cwd(), 'content');
const outputFile = join(process.cwd(), 'data', 'nav.json');

function getFiles(dir: string, basePath = ''): NavItem[] {
  if (!existsSync(dir)) {
    return [];
  }

  const items: NavItem[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  const pathMap = new Map<string, NavItem>(); // Track paths to avoid duplicates
  
  // First pass: collect all file entries
  const fileEntries: { entry: typeof entries[0]; fullPath: string; relativePath: string }[] = [];
  const dirEntries: { entry: typeof entries[0]; fullPath: string; relativePath: string }[] = [];
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(basePath, entry.name);
    
    if (entry.isDirectory()) {
      dirEntries.push({ entry, fullPath, relativePath });
    } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
      fileEntries.push({ entry, fullPath, relativePath });
    }
  }
  
  // Process files first (they take priority)
  for (const { entry, fullPath, relativePath } of fileEntries) {
    const content = readFileSync(fullPath, 'utf-8');
    const { data } = matter(content);
    const slug = entry.name.replace('.mdx', '');
    const path = `/docs/${basePath ? basePath + '/' : ''}${slug}`;
    
    const item: NavItem = {
      title: (data.title as string) || slug,
      path,
      order: (data.order as number) || 999,
    };
    items.push(item);
    pathMap.set(path, item);
  }
  
  // Then process directories (skip if file with same path exists)
  for (const { entry, fullPath, relativePath } of dirEntries) {
    const indexPath = join(fullPath, 'index.mdx');
    const path = `/docs/${relativePath}`;
    
    // Skip if we already have a file with this path
    if (pathMap.has(path)) {
      continue;
    }
    
    // Only create directory entry if it has children or an index file
    const children = getFiles(fullPath, relativePath);
    if (existsSync(indexPath) || children.length > 0) {
      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, 'utf-8');
        const { data } = matter(content);
        const item: NavItem = {
          title: (data.title as string) || entry.name,
          path,
          order: (data.order as number) || 999,
          children,
        };
        items.push(item);
        pathMap.set(path, item);
      } else {
        const item: NavItem = {
          title: entry.name,
          path,
          order: 999,
          children,
        };
        items.push(item);
        pathMap.set(path, item);
      }
    }
  }

  // Sort by order, then by title
  items.sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || 999) - (b.order || 999);
    }
    return a.title.localeCompare(b.title);
  });

  return items;
}

function generateNav() {
  console.log('📚 Generating navigation from content directory...');
  
  if (!existsSync(contentDir)) {
    console.log('⚠️  Content directory does not exist, creating empty nav.json');
    mkdirSync(dirname(outputFile), { recursive: true });
    writeFileSync(outputFile, JSON.stringify([], null, 2));
    return;
  }

  const nav = getFiles(contentDir);
  
  mkdirSync(dirname(outputFile), { recursive: true });
  writeFileSync(outputFile, JSON.stringify(nav, null, 2));
  
  console.log(`✅ Generated navigation with ${nav.length} top-level items`);
  console.log(`   Output: ${outputFile}`);
}

generateNav();

