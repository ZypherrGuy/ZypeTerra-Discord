import fs from 'fs';
import path from 'path';

export function readJson(fileName: string): any {
  const filePath = path.join(process.cwd(), 'data', 'content', fileName);
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    return null;
  }
}
