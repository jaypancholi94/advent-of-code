import { readFileSync } from 'fs';
import { join } from 'path';
import {
  countXmasOccurances,
  type Directions,
  exploreDirection,
  generate2DArray,
  initiateXmasMap,
  removeNoise,
} from './util';
// Import your utility functions here

function processInput(input: string): number {
  const dataArray = generate2DArray(input);
  const xmasMap = initiateXmasMap(dataArray);
  console.table(dataArray);
  dataArray.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column === 'X') {
        const report = exploreDirection(dataArray, { i, j }, xmasMap);
        Object.entries(report).forEach(([direction, found]) => {
          if (found) {
            const mapEntry = xmasMap.get(`(${i},${j})`);
            if (mapEntry) {
              mapEntry.directions[direction as Directions] = true;
            }
          }
        });
      }
    });
  });

  const noiseLessArray = removeNoise(dataArray, xmasMap);
  const xmasOccurances = countXmasOccurances(xmasMap);
  console.table(noiseLessArray);

  return xmasOccurances;
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
