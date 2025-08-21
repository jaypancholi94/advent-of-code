export const CORRUPTED_MEMORY = 'CORRUPTED_MEMORY';
export const VALID_MEMORY = 'VALID_MEMORY';

export type MemoryEntry = {
  type: typeof CORRUPTED_MEMORY | typeof VALID_MEMORY;
  mulA?: number;
  mulB?: number;
};

export const sanitizeMemory = (matches: RegExpMatchArray[]): MemoryEntry[] => {
  return matches.map((match) => {
    if (!match || !match[1] || !match[2]) {
      return { type: CORRUPTED_MEMORY };
    }

    const mulA = Number(match[1]);
    const mulB = Number(match[2]);

    if (isNaN(mulA) || isNaN(mulB)) {
      return { type: CORRUPTED_MEMORY };
    }

    return { type: VALID_MEMORY, mulA, mulB };
  });
};

export const multiplySequences = (sequences: MemoryEntry[]): number[] => {
  return sequences.map((entry: MemoryEntry) => {
    if (entry.type === CORRUPTED_MEMORY) {
      return 0;
    }
    return (entry.mulA ?? 0) * (entry.mulB ?? 0);
  }, 0);
};
