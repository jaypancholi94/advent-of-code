import { readFileSync } from 'fs';
import { join } from 'path';
import { multiplySequences, sanitizeMemory } from './util';

function processInput(input: string): number {
  const memory = input
    .replace(/don't[\s\S]*?do(?=[\s\W]|$)/g, '')
    .matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

  const sanitizedMemory = sanitizeMemory(Array.from(memory));

  const multipliedMemory = multiplySequences(sanitizedMemory);

  return multipliedMemory.reduce((acc, curr) => acc + curr, 0);
}

function main() {
  const input = readFileSync(
    join(__dirname, 'dataset', 'sample-2.txt'),
    'utf-8'
  ).trim();

  const result = processInput(input);

  console.log('Result:', result);
}

main();
