export const INC = 'increasing';
export const DEC = 'decreasing';
export const NOT_SORTED = 'not sorted';

export const getNuclearData = (input: string): number[][] => {
  const data: number[][] = [];
  const reports = input.trim().split('\n');
  for (const report of reports) {
    const row = report.trim().split(/\s+/).map(Number);
    data.push(row);
  }
  return data;
};

export const validateReport = (reports: Array<number>): boolean => {
  let inc = true;
  let dec = true;
  const adjacentStatus = checkAdjacent(reports);

  for (let i = 1; i < reports.length; i++) {
    const current = reports[i]!;
    const previous = reports[i - 1]!;
    if (current > previous) dec = false;
    if (current < previous) inc = false;
  }

  if ((inc || dec) && adjacentStatus) return true;

  return false;
};

export const checkAdjacent = (report: Array<number>) => {
  const isSafe = true;
  for (let i = 1; i < report.length; i++) {
    if (![1, 2, 3].includes(Math.abs(report[i]! - report[i - 1]!))) {
      return false;
    }
  }
  return isSafe;
};
