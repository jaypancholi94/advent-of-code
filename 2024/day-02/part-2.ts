import { readFileSync } from 'fs';
import { join } from 'path';
import { getNuclearData, validateReport } from './util';

function processInput(input: string): number {
  const data = getNuclearData(input);
  const reportArray: number[] = [];
  for (const row of data) {
    const isSafe = validateReport(row);
    let isSafeAfterRemoval = false;

    if (!isSafe) {
      row.forEach((_, index) => {
        //Try removing the current element
        const newArray = [...row.slice(0, index), ...row.slice(index + 1)];

        if (validateReport(newArray)) {
          isSafeAfterRemoval = true;
        }
      });
    }
    reportArray.push(isSafe ? 1 : isSafeAfterRemoval ? 1 : 0);
  }

  console.log('Safe Reports:', reportArray);
  return reportArray.reduce((acc, curr) => acc + curr, 0);
}

function main() {
  const input = readFileSync(
    join(__dirname, 'dataset', 'sample-2.txt'),
    'utf-8'
  ).trim();

  const result = processInput(input);

  console.log('Total Safe Reports:', result);
}

main();
