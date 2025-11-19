import { notFound } from 'next/navigation';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button, Badge } from '@figkit/ui';

async function getDocContent(slug: string[]) {
  const filePath = join(process.cwd(), 'content', ...slug) + '.mdx';
  const fallbackPath = join(process.cwd(), 'content', ...slug, 'index.mdx');
  
  let content: string;
  let fileExists = false;
  
  if (existsSync(filePath)) {
    content = readFileSync(filePath, 'utf-8');
    fileExists = true;
  } else if (existsSync(fallbackPath)) {
    content = readFileSync(fallbackPath, 'utf-8');
    fileExists = true;
  }
  
  if (!fileExists) {
    return null;
  }
  
  const { data, content: markdownContent } = matter(content);
  
  return {
    frontmatter: data,
    content: markdownContent,
  };
}

export default async function DocPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug || [];
  const doc = await getDocContent(slug);
  
  if (!doc) {
    notFound();
  }
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        flex: 1,
        padding: 'var(--space-6, 24px)',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <Search />
        <article>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: 'var(--space-4, 16px)',
            color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
          }}>
            {doc.frontmatter.title as string}
          </h1>
          {doc.frontmatter.description && (
            <p style={{
              fontSize: '18px',
              marginBottom: 'var(--space-6, 24px)',
              color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.6))',
            }}>
              {doc.frontmatter.description as string}
            </p>
          )}
          <div style={{
            lineHeight: 1.7,
            color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
          }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {doc.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}
