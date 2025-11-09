// packages/figma-mcp/scripts/diff-tokens.ts
import 'dotenv/config';
import equal from 'fast-deep-equal';
import { readJSON, writeJSON } from './utils/fs.js';
import { fetchVariables } from './utils/figma.js';
import { mapToStyleDictionary } from './utils/map.js';
import { contrastRatio } from './utils/wcag.js';

type SDTree = Record<string, any>;

function flatten(tree: SDTree, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(tree)) {
    const path = prefix ? `${prefix}/${k}` : k;
    if (v && typeof v === 'object' && 'value' in v) out[path] = v.value as string;
    else if (v && typeof v === 'object') Object.assign(out, flatten(v as SDTree, path));
  }
  return out;
}

function mdTable(rows: string[][]) {
  const header = ['Token', 'From', '→', 'To'];
  const sep = ['---','---','---','---'];
  return [
    `| ${header.join(' | ')} |`,
    `| ${sep.join(' | ')} |`,
    ...rows.map(r => `| ${r.join(' | ')} |`)
  ].join('\n');
}

async function wcagReport(flat: Record<string,string>) {
  const pairs = await readJSON<{fg:string;bg:string;min:number;label:string}[]>('packages/figma-mcp/config/pairs.json');
  const issues: string[] = [];
  for (const p of pairs) {
    const fg = flat[p.fg], bg = flat[p.bg];
    if (!fg || !bg) continue;
    const ratio = contrastRatio(fg, bg);
    if (ratio < p.min) {
      issues.push(`- ❌ **${p.label}** (${p.fg} on ${p.bg}) ratio **${ratio.toFixed(2)}** < **${p.min}**`);
    }
  }
  return issues.length ? issues.join('\n') : '✅ All configured pairs meet WCAG thresholds.';
}

export async function diffTokens() {
  const current = await readJSON<SDTree>('packages/tokens/src/tokens.json').catch(() => ({}));
  const raw = await fetchVariables(process.env.FIGMA_FILE_KEY!);
  const next = await mapToStyleDictionary(raw);

  const curFlat = flatten(current);
  const nextFlat = flatten(next);

  const added: string[][] = [];
  const removed: string[][] = [];
  const changed: string[][] = [];

  const keys = new Set([...Object.keys(curFlat), ...Object.keys(nextFlat)]);
  for (const k of keys) {
    const a = curFlat[k], b = nextFlat[k];
    if (a === undefined && b !== undefined) added.push([k, '', '→', String(b)]);
    else if (a !== undefined && b === undefined) removed.push([k, String(a), '→', '']);
    else if (a !== b) changed.push([k, String(a), '→', String(b)]);
  }

  const report: string[] = ['# Token Diff Report\n'];

  if (!added.length && !removed.length && !changed.length) report.push('No changes detected.');
  if (added.length)   report.push('\n## Added\n'   + mdTable(added));
  if (removed.length) report.push('\n## Removed\n' + mdTable(removed));
  if (changed.length) report.push('\n## Changed\n' + mdTable(changed));

  report.push('\n## WCAG Check\n');
  report.push(await wcagReport(nextFlat));

  // Write a snapshot for PR comment use
  await writeJSON('packages/figma-mcp/.last-diff.json', { added, removed, changed });
  
  const markdown = report.join('\n');
  
  return {
    success: true,
    markdown,
    summary: {
      added: added.length,
      removed: removed.length,
      changed: changed.length
    }
  };
}

async function main() {
  const result = await diffTokens();
  console.log(result.markdown);
}

// Only run main if this is the entry point (not imported)
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('diff-tokens.ts')) {
  main().catch((e) => {
    console.error('diff failed:', e);
    process.exit(1);
  });
}
