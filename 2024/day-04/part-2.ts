import { readFileSync } from 'fs';
import { join } from 'path';
import {
  exploreDiagonal,
  generate2DArray,
  initiateXmasMap,
  removeNoise,
  type baseDiagonalMap,
} from './util';
// Import your utility functions here

function processInput(input: string): number {
  const dataArray = generate2DArray(input);

  const xmasMap = initiateXmasMap(dataArray, true);
  console.table(dataArray);
  dataArray.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column === 'A') {
        exploreDiagonal(
          dataArray,
          { i, j },
          xmasMap as Map<string, baseDiagonalMap>
        );
      }
    });
  });
  const noiseLessArray = removeNoise(dataArray, xmasMap);
  console.table(noiseLessArray);
  const aOccurrences = noiseLessArray
    .flat()
    .filter((cell) => cell === 'A').length;
  //   console.table(dataArray);
  return aOccurrences;
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
