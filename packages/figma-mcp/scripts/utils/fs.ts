import { promises as fs } from 'fs';
import path from 'path';

export const readJSON = async <T>(p: string): Promise<T> =>
  JSON.parse(await fs.readFile(p, 'utf8'));

export const writeJSON = async (p: string, data: unknown) => {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
};
