import { readdirSync, readFileSync, statSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import matter from 'gray-matter';
import lunr from 'lunr';

interface Doc {
  title: string;
  path: string;
  description?: string;
  content: string;
}

const contentDir = join(process.cwd(), 'content');
const outputFile = join(process.cwd(), 'public', 'search-index.json');

function getAllDocs(dir: string, basePath = ''): Doc[] {
  if (!existsSync(dir)) {
    return [];
  }

  const docs: Doc[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(basePath, entry.name);

    if (entry.isDirectory()) {
      docs.push(...getAllDocs(fullPath, relativePath));
    } else if (entry.name.endsWith('.mdx')) {
      const content = readFileSync(fullPath, 'utf-8');
      const { data, content: mdxContent } = matter(content);
      const slug = entry.name.replace('.mdx', '');
      const path = `/docs/${basePath ? basePath + '/' : ''}${slug}`;
      
      docs.push({
        title: (data.title as string) || slug,
        path,
        description: data.description as string | undefined,
        content: mdxContent,
      });
    }
  }

  return docs;
}

function buildSearchIndex() {
  console.log('🔍 Building search index...');
  
  if (!existsSync(contentDir)) {
    console.log('⚠️  Content directory does not exist, creating empty index');
    mkdirSync(dirname(outputFile), { recursive: true });
    writeFileSync(outputFile, JSON.stringify(lunr.Index.prototype.toJSON.call({})), 'utf-8');
    return;
  }

  const docs = getAllDocs(contentDir);
  
  if (docs.length === 0) {
    console.log('⚠️  No documents found');
    return;
  }

  const idx = lunr(function () {
    this.ref('path');
    this.field('title', { boost: 10 });
    this.field('description', { boost: 5 });
    this.field('content');

    docs.forEach((doc) => {
      this.add(doc);
    });
  });

  mkdirSync(dirname(outputFile), { recursive: true });
  writeFileSync(outputFile, JSON.stringify(idx.toJSON()), 'utf-8');
  
  console.log(`✅ Built search index with ${docs.length} documents`);
  console.log(`   Output: ${outputFile}`);
}

buildSearchIndex();

