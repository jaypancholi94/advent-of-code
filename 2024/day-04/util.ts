export type Directions = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';

export type DiagonalDirections = 'NE' | 'NW' | 'SE' | 'SW' | 'current';

export type baseMap = {
  directions: Record<Directions, boolean>;
  amIPartOfXmas: boolean;
};
export type baseDiagonalMap = {
  directions: Record<DiagonalDirections, boolean>;
};

export const MAGIC_WORD = 'XMAS';
export const MAGIC_WITHOUT_X_WORD = 'MAS';

export const generate2DArray = (input: string): string[][] => {
  return input.split('\n').map((line) => line.split(''));
};

export function initiateXmasMap(
  dataArray: string[][],
  isDiagonal = false
): Map<string, baseMap | baseDiagonalMap> {
  if (isDiagonal) {
    const xmasMap = new Map<string, baseDiagonalMap>();
    dataArray.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const key = `(${rowIndex},${colIndex})`;
        xmasMap.set(key, {
          directions: {
            NE: false,
            NW: false,
            SE: false,
            SW: false,
            current: false,
          },
        });
      });
    });
    return xmasMap;
  } else {
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
          amIPartOfXmas: false,
        });
      });
    });
    return xmasMap;
  }
}
export const exploreDiagonal = (
  dataArray: string[][],
  currentIndex: { i: number; j: number },
  xmasMap: Map<string, baseDiagonalMap>
) => {
  const report = {
    NE: false,
    NW: false,
    SE: false,
    SW: false,
    current: false,
  };
  let isNWSEHasX = false;
  let isNESWHasX = false;

  const { i, j } = currentIndex;

  const updateXmasMap = (report: Record<DiagonalDirections, boolean>) => {
    const key = `(${i},${j})`;
    const entry = xmasMap.get(key);
    if (entry) {
      entry['directions'] = report;
    }
  };

  //Check NW-SE & SE-NW
  const positionNWSE = [
    { i: i - 1, j: j - 1 }, // Northwest
    { i, j }, // Current
    { i: i + 1, j: j + 1 }, // Southeast
  ];

  const positionSENW = [
    { i: i + 1, j: j + 1 }, // Southeast
    { i, j }, // Current
    { i: i - 1, j: j - 1 }, // Northwest
  ];
  const valueNWSE = positionNWSE
    .map((pos) => dataArray[pos.i]?.[pos.j] ?? '')
    .join('');
  const valueSENW = positionSENW
    .map((pos) => dataArray[pos.i]?.[pos.j] ?? '')
    .join('');
  if (
    valueNWSE === MAGIC_WITHOUT_X_WORD ||
    valueSENW === MAGIC_WITHOUT_X_WORD
  ) {
    // console.log(`\\: `, valueNWSE, valueSENW, { i, j });
    isNWSEHasX = true;
  }

  // Check NE-SW & SW-NE
  const positionNESW = [
    { i: i - 1, j: j + 1 }, // Northeast
    { i, j }, // Current
    { i: i + 1, j: j - 1 }, // Southwest
  ];
  const positionSWNE = [
    { i: i + 1, j: j - 1 }, // Southwest
    { i, j }, // Current
    { i: i - 1, j: j + 1 }, // Northeast
  ];

  const valueNESW = positionNESW
    .map((pos) => dataArray[pos.i]?.[pos.j] ?? '')
    .join('');
  const valueSWNE = positionSWNE
    .map((pos) => dataArray[pos.i]?.[pos.j] ?? '')
    .join('');

  if (
    valueNESW === MAGIC_WITHOUT_X_WORD ||
    valueSWNE === MAGIC_WITHOUT_X_WORD
  ) {
    // console.log(`/: `, valueNESW, valueSWNE, { i, j });
    isNESWHasX = true;
  }

  if (isNESWHasX && isNWSEHasX) {
    updateXmasMap;
    return updateXmasMap({
      NE: true,
      NW: true,
      SE: true,
      SW: true,
      current: true,
    });
  }

  return updateXmasMap(report);
};

export const countXmasOccurrences = (
  xmasMap: Map<string, baseMap | baseDiagonalMap>
) => {
  let count = 0;
  xmasMap.forEach((entry) => {
    const numDirections = Object.values(entry.directions).filter(
      Boolean
    ).length;
    count += numDirections;
  });
  return count;
};

export const removeNoise = (
  dataArray: string[][],
  xmasMap: Map<string, baseMap | baseDiagonalMap>
) => {
  return dataArray.map((row, i) => {
    return row.map((column, j) => {
      const mapEntry = xmasMap.get(`(${i},${j})`);

      if (mapEntry && 'amIPartOfXmas' in mapEntry) {
        const hasXmas = mapEntry.amIPartOfXmas;
        return hasXmas ? column : '.';
      }
      if (
        mapEntry &&
        !('amIPartOfXmas' in mapEntry) &&
        'directions' in mapEntry
      ) {
        const directions = mapEntry.directions;
        return directions.NE || directions.NW || directions.SE || directions.SW
          ? column
          : '.';
      }
      return column;
    });
  });
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
        entry.amIPartOfXmas = true;
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
