import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'lib', 'data');

export async function readJSON<T>(filename: string, defaultValue: T): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {

    // If file doesn't exist, ensure directory exists and return default
    await fs.mkdir(DATA_DIR, { recursive: true });
    return defaultValue;
  }
}

export async function writeJSON<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
