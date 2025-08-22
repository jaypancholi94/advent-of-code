import { readFileSync } from 'fs';
import { join } from 'path';
import {
  type baseMap,
  countXmasOccurrences,
  type Directions,
  exploreDirection,
  generate2DArray,
  initiateXmasMap,
  removeNoise,
} from './util';
// Import your utility functions here

function processInput(input: string): number {
  const dataArray = generate2DArray(input);
  const xmasMap = initiateXmasMap(dataArray, false);
  console.table(dataArray);
  dataArray.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column === 'X') {
        const report = exploreDirection(
          dataArray,
          { i, j },
          xmasMap as Map<string, baseMap>
        );
        Object.entries(report).forEach(([direction, found]) => {
          if (found) {
            const key = `(${i},${j})`;
            const mapEntry = xmasMap.get(key);
            if (mapEntry && direction in mapEntry.directions) {
              (mapEntry.directions as Record<Directions, boolean>)[
                direction as Directions
              ] = true;
            }
          }
        });
      }
    });
  });

  const noiseLessArray = removeNoise(
    dataArray,
    xmasMap as Map<string, baseMap>
  );
  const xmasOccurrences = countXmasOccurrences(xmasMap);
  console.table(noiseLessArray);

  return xmasOccurrences;
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
