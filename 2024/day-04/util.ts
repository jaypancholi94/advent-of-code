export type Directions = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';

type baseMap = {
  directions: Record<Directions, boolean>;
  amIpartOfXmas: boolean;
};

export const MAGIC_WORD = 'XMAS';

export const generate2DArray = (input: string): string[][] => {
  return input.split('\n').map((line) => line.split(''));
};

export const initiateXmasMap = (
  dataArray: string[][]
): Map<string, baseMap> => {
  const xmasMap = new Map<string, baseMap>();

  dataArray.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      const key = `(${rowIndex},${colIndex})`;
      xmasMap.set(key, {
        directions: {
          N: false,
          S: false,
          E: false,
          W: false,
          NE: false,
          NW: false,
          SE: false,
          SW: false,
        },
        amIpartOfXmas: false,
      });
    });
  });

  return xmasMap;
};

export const exploreDirection = (
  dataArray: string[][],
  currentIndex: { i: number; j: number },
  xmasMap: Map<string, baseMap>
): Record<Directions, boolean> => {
  const report = {
    N: false,
    S: false,
    E: false,
    W: false,
    NE: false,
    NW: false,
    SE: false,
    SW: false,
  };

  const updateXmasMap = (positions: Array<{ i: number; j: number }>) => {
    positions.forEach(({ i, j }) => {
      const key = `(${i},${j})`;
      const entry = xmasMap.get(key);
      if (entry) {
        entry.amIpartOfXmas = true;
      }
    });
  };

  const { i, j } = currentIndex;
  if (dataArray.length > 0 && dataArray[0]) {
    // North (needs 3 cells above)
    if (i >= 3) {
      const positions = [
        { i, j },
        { i: i - 1, j },
        { i: i - 2, j },
        { i: i - 3, j },
      ];
      report.N =
        [
          dataArray[i]?.[j] ?? '',
          dataArray[i - 1]?.[j] ?? '',
          dataArray[i - 2]?.[j] ?? '',
          dataArray[i - 3]?.[j] ?? '',
        ].join('') === MAGIC_WORD;

      if (report.N) {
        updateXmasMap(positions);
      }
    }

    // Northeast
    if (i >= 3 && j + 3 < dataArray[0].length) {
      const positions = [
        { i, j },
        { i: i - 1, j: j + 1 },
        { i: i - 2, j: j + 2 },
        { i: i - 3, j: j + 3 },
      ];
      report.NE =
        [
          dataArray[i]?.[j] ?? '',
          dataArray[i - 1]?.[j + 1] ?? '',
          dataArray[i - 2]?.[j + 2] ?? '',
          dataArray[i - 3]?.[j + 3] ?? '',
        ].join('') === MAGIC_WORD;

      if (report.NE) {
        updateXmasMap(positions);
      }
    }

    // East
    if (j + 3 < dataArray[0].length) {
      const positions = [
        { i, j },
        { i, j: j + 1 },
        { i, j: j + 2 },
        { i, j: j + 3 },
      ];
      report.E =
        [
          dataArray[i]?.[j] ?? '',
          dataArray[i]?.[j + 1] ?? '',
          dataArray[i]?.[j + 2] ?? '',
          dataArray[i]?.[j + 3] ?? '',
        ].join('') === MAGIC_WORD;

      if (report.E) {
        updateXmasMap(positions);
      }
    }

    // Southeast
    if (i + 3 < dataArray.length && j + 3 < dataArray[0].length) {
      const positions = [
        { i, j },
        { i: i + 1, j: j + 1 },
        { i: i + 2, j: j + 2 },
        { i: i + 3, j: j + 3 },
      ];
      report.SE =
        [
          dataArray[i]?.[j] ?? '',
          dataArray[i + 1]?.[j + 1] ?? '',
          dataArray[i + 2]?.[j + 2] ?? '',
          dataArray[i + 3]?.[j + 3] ?? '',
        ].join('') === MAGIC_WORD;

      if (report.SE) {
        updateXmasMap(positions);
      }
    }

    // South
    if (i + 3 < dataArray.length) {
      const positions = [
        { i, j },
        { i: i + 1, j },
        { i: i + 2, j },
        { i: i + 3, j },
      ];
      report.S =
        [
          dataArray[i]?.[j] ?? '',
          dataArray[i + 1]?.[j] ?? '',
          dataArray[i + 2]?.[j] ?? '',
          dataArray[i + 3]?.[j] ?? '',
        ].join('') === MAGIC_WORD;

      if (report.S) {
        updateXmasMap(positions);
      }
    }

    // Southwest
    if (i + 3 < dataArray.length && j >= 3) {
      const positions = [
        { i, j },
        { i: i + 1, j: j - 1 },
        { i: i + 2, j: j - 2 },
        { i: i + 3, j: j - 3 },
      ];
      report.SW =
        [
          dataArray[i]?.[j] ?? '',
          dataArray[i + 1]?.[j - 1] ?? '',
          dataArray[i + 2]?.[j - 2] ?? '',
          dataArray[i + 3]?.[j - 3] ?? '',
        ].join('') === MAGIC_WORD;

      if (report.SW) {
        updateXmasMap(positions);
      }
    }

    // West
    if (j >= 3) {
      const positions = [
        { i, j },
        { i, j: j - 1 },
        { i, j: j - 2 },
        { i, j: j - 3 },
      ];
      report.W =
        [
          dataArray[i]?.[j] ?? '',
          dataArray[i]?.[j - 1] ?? '',
          dataArray[i]?.[j - 2] ?? '',
          dataArray[i]?.[j - 3] ?? '',
        ].join('') === MAGIC_WORD;

      if (report.W) {
        updateXmasMap(positions);
      }
    }

    // Northwest
    if (i >= 3 && j >= 3) {
      const positions = [
        { i, j },
        { i: i - 1, j: j - 1 },
        { i: i - 2, j: j - 2 },
        { i: i - 3, j: j - 3 },
      ];
      report.NW =
        [
          dataArray[i]?.[j] ?? '',
          dataArray[i - 1]?.[j - 1] ?? '',
          dataArray[i - 2]?.[j - 2] ?? '',
          dataArray[i - 3]?.[j - 3] ?? '',
        ].join('') === MAGIC_WORD;

      if (report.NW) {
        updateXmasMap(positions);
      }
    }
  }

  return report;
};

export const removeNoise = (
  dataArray: string[][],
  xmasMap: Map<string, baseMap>
) => {
  return dataArray.map((row, i) => {
    return row.map((column, j) => {
      const mapEntry = xmasMap.get(`(${i},${j})`);

      if (mapEntry) {
        const hasXmas = mapEntry.amIpartOfXmas;
        return hasXmas ? column : '.';
      }
      return column;
    });
  });
};

export const countXmasOccurances = (xmasMap: Map<string, baseMap>) => {
  let count = 0;
  xmasMap.forEach((entry) => {
    const numDirections = Object.values(entry.directions).filter(
      Boolean
    ).length;
    count += numDirections;
  });
  return count;
};
