import { readFileSync } from "node:fs";
import { join } from "node:path";
import { compareNumber } from "./util";

function processInput(input: string): number {
  // Initialize two arrays for left and right numbers
  const leftArray: number[] = [];
  const rightArray: number[] = [];
  const distanceArray: number[] = [];

  // Parse the content and populate the arrays
  const lines = input.trim().split("\n");
  for (const line of lines) {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    if (
      typeof left === "number" &&
      typeof right === "number" &&
      !isNaN(left) &&
      !isNaN(right)
    ) {
      leftArray.push(left);
      rightArray.push(right);
    }
  }

  leftArray.sort(compareNumber);
  rightArray.sort(compareNumber);

  // Calculate distances using the shorter array length to ensure we have valid indices
  const arrayLength = Math.min(leftArray.length, rightArray.length);
  for (let i = 0; i < arrayLength; i++) {
    // We know these indices exist because we're within the bounds of both arrays
    const left = leftArray[i]!;
    const right = rightArray[i]!;
    const distance = Math.abs(right - left);
    distanceArray.push(distance);
  }

  const totalDistance = distanceArray.reduce((acc, curr) => acc + curr, 0);

  console.log("Left Array:", leftArray);
  console.log("Right Array:", rightArray);
  console.log("Distance Array:", distanceArray);

  return totalDistance;
}

function main() {
  const input = readFileSync(
    join(__dirname, "dataset", "sample-2.txt"),
    "utf-8"
  ).trim();

  const result = processInput(input);

  console.log("Total Distance:", result);
}

main();
