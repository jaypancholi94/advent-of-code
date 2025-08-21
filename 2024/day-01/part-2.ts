import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function processInput(input: string): number {
  // Initialize two arrays for left and right numbers
  const leftArray: number[] = [];
  const rightArray: number[] = [];
  const similarityScoreArray: number[] = [];

  // const compareNumber = (a: number, b: number) => a - b;

  // Parse the content and populate the arrays
  const lines = input.trim().split('\n');
  for (const line of lines) {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    if (
      typeof left === 'number' &&
      typeof right === 'number' &&
      !isNaN(left) &&
      !isNaN(right)
    ) {
      leftArray.push(left);
      rightArray.push(right);
    }
  }

  // Calculate distances using the shorter array length to ensure we have valid indices
  const arrayLength = Math.min(leftArray.length, rightArray.length);
  for (let i = 0; i < arrayLength; i++) {
    const left = leftArray[i]!;
    const similarityScore =
      rightArray.filter((num) => num === left).length * left;
    similarityScoreArray.push(similarityScore);
  }

  const totalSimilarityScore = similarityScoreArray.reduce(
    (acc, curr) => acc + curr,
    0
  );

  console.log('Left Array:', leftArray);
  console.log('Right Array:', rightArray);
  console.log('Similarity Score Array:', similarityScoreArray);

  return totalSimilarityScore;
}

function main() {
  const input = readFileSync(
    join(__dirname, 'dataset', 'sample-2.txt'),
    'utf-8'
  ).trim();

  const result = processInput(input);

  console.log('Similarity Score:', result);
}

main();
