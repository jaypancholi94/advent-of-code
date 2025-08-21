import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { performance } from 'node:perf_hooks';

function pad2(value: string | number): string {
  return String(value).padStart(2, '0');
}

type ParsedArgs = { day: string; year: string; part?: number };

function parseArgs(argv: Array<string>): ParsedArgs {
  const now = new Date();
  let day = '';
  let year = String(now.getFullYear());
  let part: number | undefined;

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg) continue;

    if (arg === '--year' || arg === '-y') {
      const next = argv[i + 1];
      if (!next) {
        console.error('❗ Missing value for --year');
        process.exit(1);
      }
      year = next;
      i += 1;
      continue;
    }

    if (arg.startsWith('--year=')) {
      year = arg.slice('--year='.length);
      continue;
    }

    if (arg === '--part' || arg === '-p') {
      const next = argv[i + 1];
      if (!next) {
        console.error('❗ Missing value for --part');
        process.exit(1);
      }
      const parsedPart = parseInt(next, 10);
      if (isNaN(parsedPart) || parsedPart < 1 || parsedPart > 2) {
        console.error('❗ Part must be 1 or 2');
        process.exit(1);
      }
      part = parsedPart;
      i += 1;
      continue;
    }

    if (arg.startsWith('--part=')) {
      const parsedPart = parseInt(arg.slice('--part='.length), 10);
      if (isNaN(parsedPart) || parsedPart < 1 || parsedPart > 2) {
        console.error('❗ Part must be 1 or 2');
        process.exit(1);
      }
      part = parsedPart;
      continue;
    }

    // first non-flag becomes <day>
    if (day === '') day = arg;
  }

  return { day, year, ...(part !== undefined && { part }) };
}

function resolveDayEntry(year: string, day: string, part = 1): string {
  const dayDir = `day-${pad2(day)}`;
  const fileName = `part-${String(part)}.ts`;
  return join(process.cwd(), year, dayDir, fileName);
}

async function main(): Promise<void> {
  const { day, year, part = 1 } = parseArgs(process.argv);

  if (!day) {
    console.error('Usage: bun run day <day-number> [--year 2024]');
    process.exit(1);
  }

  const entry = resolveDayEntry(year, day, part);

  if (!existsSync(entry)) {
    console.error(`❗ Not found: ${entry}`);
    process.exit(1);
  }

  const start = performance.now();
  try {
    // Dynamic import executes top-level code of the day's module
    await import(pathToFileURL(entry).href);
  } catch (error) {
    console.error('💥 Failed to execute day script:', error);
    process.exit(1);
  }
  const elapsed = Math.round(performance.now() - start);
  console.log(`\n✨ Advent of Code ${year} ✨`);
  console.log(
    `└── 🎄 Day ${pad2(day)} | Part ${part} completed in ${elapsed}ms 🚀\n`
  );
}

await main();
