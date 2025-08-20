import { readFileSync } from "fs";
import { join } from "path";
import { checkAdjacent, checkOrder, DEC, getNuclearData, INC } from "./util";

function processInput(input: string): number {
  const data = getNuclearData(input);
  const reportArray: number[] = [];
  for (const row of data) {
    const order = checkOrder(row);

    const adjacent = checkAdjacent(row);

    reportArray.push(adjacent && (order === INC || order === DEC) ? 1 : 0);
  }

  console.log("Safe Reports:", reportArray);
  return reportArray.reduce((acc, curr) => acc + curr, 0);
}

function main() {
  const input = readFileSync(
    join(__dirname, "dataset", "sample-2.txt"),
    "utf-8"
  ).trim();

  const result = processInput(input);

  console.log("Total Safe Reports:", result);
}

main();
