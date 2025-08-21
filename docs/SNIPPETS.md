# Advent of Code VS Code Snippets

This file documents all the VS Code snippets available for your Advent of Code project. These snippets help reduce boilerplate code and speed up solution development.

## 📝 Available Snippets

### 1. **Basic Solution Template** - `aoc-solution`

**Usage:** Type `aoc-solution` and press Tab

Creates a basic Advent of Code solution structure with:

- File reading imports
- `processInput` function
- `main` function with file reading
- Console logging

**Template:**

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';
// Import your utility functions here

function processInput(input: string): number {
  // Parse input
  // Process the data
  // Return result
  return 0;
}

function main() {
  const input = readFileSync(
    join(__dirname, 'dataset', 'sample-1.txt'),
    'utf-8'
  ).trim();

  const result = processInput(input);

  console.log('Result:', result);
}

main();
```

### 2. **Nuclear Data Pattern** - `aoc-nuclear`

**Usage:** Type `aoc-nuclear` and press Tab

Creates a template based on your current `part-1.ts` pattern with:

- Utility function imports
- Data processing with validation
- Binary scoring (0/1) based on conditions
- Array reduction for totals

**Template:**

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';
import { checkAdjacent, getNuclearData, validateReport } from './util';

function processInput(input: string): number {
  const data = getNuclearData(input);
  const reportArray: number[] = [];

  for (const row of data) {
    const order = validateReport(row);
    const adjacent = checkAdjacent(row);

    reportArray.push(adjacent && order ? 1 : 0);
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
```

### 3. **Solution with Utilities** - `aoc-util`

**Usage:** Type `aoc-util` and press Tab

Creates a template for solutions that use utility functions:

- Utility imports from `./util`
- Array processing pattern
- Results collection and reduction

### 4. **Validation Loop** - `aoc-validate`

**Usage:** Type `aoc-validate` and press Tab

Creates just the validation loop pattern:

```typescript
const resultArray: number[] = [];

for (const row of data) {
  const condition1 = validateFunction1(row);
  const condition2 = validateFunction2(row);

  resultArray.push(condition2 && condition1 ? 1 : 0);
}

console.log('Results:', resultArray);
return resultArray.reduce((acc, curr) => acc + curr, 0);
```

### 5. **Array Processing** - `aoc-array`

**Usage:** Type `aoc-array` and press Tab

Creates a generic array processing pattern for iterating and collecting results.

### 6. **File Reader** - `aoc-file`

**Usage:** Type `aoc-file` and press Tab

Creates just the file reading code:

```typescript
const input = readFileSync(
  join(__dirname, 'dataset', 'sample-1.txt'),
  'utf-8'
).trim();
```

### 7. **Main Function** - `aoc-main`

**Usage:** Type `aoc-main` and press Tab

Creates just the main function with file reading and result processing.

### 8. **Debug Log** - `aoc-log`

**Usage:** Type `aoc-log` and press Tab

Creates a quick debug console log:

```typescript
console.log('Debug:', variable);
```

### 9. **Grid Processing** - `aoc-grid`

**Usage:** Type `aoc-grid` and press Tab

Creates a template for 2D grid problems with nested loops for row/column iteration.

## 🚀 How to Use

1. **Create a new TypeScript file** for your solution
2. **Type the snippet prefix** (e.g., `aoc-nuclear`)
3. **Press Tab** to expand the snippet
4. **Navigate through placeholders** using Tab to fill in your specific values
5. **Customize** the template for your specific problem

## 💡 Benefits

- **Faster development**: No need to type repetitive boilerplate
- **Consistency**: All solutions follow the same structure
- **Tab completion**: Easy navigation through placeholders
- **Pattern recognition**: Common Advent of Code patterns are captured

## 🎯 Pro Tips

- Use `aoc-nuclear` for problems similar to your current Day 2 pattern
- Use `aoc-solution` for starting new solutions from scratch
- Use `aoc-validate` when you just need the validation loop logic
- Use `aoc-grid` for problems involving 2D arrays or maps
- Combine snippets: Use `aoc-file` for just file reading in existing code

Happy coding! 🎄✨
