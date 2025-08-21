# 🎄 Advent of Code Solutions

A TypeScript/Bun-powered repository containing solutions for [Advent of Code](https://adventofcode.com/) challenges across multiple years.

## 📁 Project Structure

```text
advent-of-code/
├── 2023/                    # Solutions for Advent of Code 2023
│   ├── day-01/
│   │   ├── README.md        # Problem description
│   │   ├── sample.txt       # Sample input data
│   │   ├── part-01/
│   │   │   └── Main.java    # Java solution for part 1
│   │   └── part-02/
│   │       └── Main.java    # Java solution for part 2
│   └── day-02/
│       └── ...
├── 2024/                    # Solutions for Advent of Code 2024
│   ├── day-01/
│   │   ├── part-1.ts        # TypeScript solution for part 1
│   │   ├── part-2.ts        # TypeScript solution for part 2
│   │   ├── util.ts          # Shared utilities
│   │   └── dataset/
│   │       ├── sample-1.txt # Sample input for part 1
│   │       └── sample-2.txt # Sample input for part 2
│   └── day-02/
│       └── ...
└── scripts/
    └── run-day.ts           # Script runner for daily challenges
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- TypeScript support

### Installation

```bash
# Install dependencies
bun install
```

## 🎯 Running Solutions

Use the built-in runner script to execute daily solutions:

```bash
# Run a specific day and part for the current year
bun run day <day-number> [options]

# Examples:
bun run day 1                    # Run day 1, part 1 for current year
bun run day 1 -p 2              # Run day 1, part 2 for current year
bun run day 2 -y 2024           # Run day 2, part 1 for 2024
bun run day 3 -y 2023 -p 2      # Run day 3, part 2 for 2023
```

### Options

- `-y, --year <year>`: Specify the year (defaults to current year)
- `-p, --part <1|2>`: Specify which part to run (defaults to 1)

## 🔧 Development Tools

### Code Quality & Formatting

```bash
# Type checking
bun run typecheck              # Check TypeScript types
bun run typecheck:watch        # Watch mode for type checking

# Linting
bun run lint                   # Check code with ESLint
bun run lint:fix              # Auto-fix ESLint issues

# Formatting
bun run format                 # Format code with Prettier
bun run format:check          # Check if code is formatted

# All-in-one checks
bun run check                  # Run typecheck + lint + format check
bun run fix                   # Run lint:fix + format
```

## 🏗️ Adding New Solutions

### For TypeScript solutions (2024+)

1. Create a new day directory: `2024/day-XX/`
2. Add your solution files:
   - `part-1.ts` - Solution for part 1
   - `part-2.ts` - Solution for part 2
   - `util.ts` - Shared utilities (optional)
3. Add sample data in `dataset/` directory
4. Run using the script runner

### For Java solutions (2023)

1. Create the directory structure as shown above
2. Add `Main.java` files in respective part directories
3. Include problem description in `README.md`
4. Add sample input in `sample.txt`

## 🎁 Features

- **Multi-language support**: TypeScript (2024+) and Java (2023)
- **Performance tracking**: Execution time measurement
- **Organized structure**: Clear separation by year and day
- **Sample data support**: Easy testing with provided examples
- **CLI runner**: Simple command-line interface for running solutions
- **Code quality tools**: ESLint for linting, Prettier for formatting
- **Type safety**: Strict TypeScript configuration with comprehensive checks
- **Development experience**: VS Code integration with recommended extensions
- **Path mapping**: Clean imports using TypeScript path aliases

## 📊 Languages Used

- **TypeScript** (2024): Modern, type-safe solutions with Bun runtime
- **Java** (2023): Classic object-oriented approach

## 🤝 Contributing

Feel free to contribute by:

- Adding solutions for missing days
- Optimizing existing solutions
- Adding alternative approaches
- Improving documentation

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

---

Happy coding and may your solutions be efficient! 🎄✨
