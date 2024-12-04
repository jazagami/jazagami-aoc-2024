import * as path from 'path';
import { getDataRows } from '@jazagami-aoc-2024/day-1';
import { isTrajectorySafe } from './index.ts';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

const fakeData = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

export const part1Solution = (fakeData?: Array<number[]>) => {
  const values = fakeData || getDataRows(dataPath);
  return values.reduce((aggregate, value) => {
    if (isTrajectorySafe(value)) {
        return aggregate + 1;
    }
    return aggregate;
  }, 0);
}

export const part2Solution = (fakeData?) => {
  const values = fakeData || getDataRows(dataPath);
  return values.reduce((aggregate, value) => {
    if (isTrajectorySafe(value, true)) {
        return aggregate + 1;
    }
    return aggregate;
  }, 0);
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

main();