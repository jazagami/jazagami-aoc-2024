import * as path from 'path';
import { getDataLines } from '@jazagami-aoc-2024/day-1';
import { findStartPositions, followMiddle, followStart } from './index.ts';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = (fakeData?) => {
  const TARGET_WORD = 'XMAS';
  const data:string[] = fakeData || getDataLines(dataPath);
  const startPositions = findStartPositions(data, TARGET_WORD.charAt(0));
  return startPositions.reduce((aggregate, [xpos, ypos]) => {
    return aggregate + followStart(data, TARGET_WORD)(xpos, ypos);
  }, 0);
}

export const part2Solution = (fakeData?) => {
  const TARGET_WORD = 'MAS';
  const data:string[] = fakeData || getDataLines(dataPath);
  const startPositions = findStartPositions(data, TARGET_WORD.charAt(1));
  return startPositions.filter((coordinates) => followMiddle(data, TARGET_WORD)(...coordinates)).length;
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

main();