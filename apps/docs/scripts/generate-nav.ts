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

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(basePath, entry.name);

    if (entry.isDirectory()) {
      const indexPath = join(fullPath, 'index.mdx');
      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, 'utf-8');
        const { data } = matter(content);
        items.push({
          title: (data.title as string) || entry.name,
          path: `/docs/${relativePath}`,
          order: (data.order as number) || 999,
          children: getFiles(fullPath, relativePath),
        });
      } else {
        items.push({
          title: entry.name,
          path: `/docs/${relativePath}`,
          order: 999,
          children: getFiles(fullPath, relativePath),
        });
      }
    } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
      const content = readFileSync(fullPath, 'utf-8');
      const { data } = matter(content);
      const slug = entry.name.replace('.mdx', '');
      items.push({
        title: (data.title as string) || slug,
        path: `/docs/${basePath ? basePath + '/' : ''}${slug}`,
        order: (data.order as number) || 999,
      });
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

