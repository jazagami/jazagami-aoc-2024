import { readTextFile } from '@jazagami-aoc-2024/day-3';
import * as path from 'path';
import { DriveMap } from './index.ts';

let dataPath: string;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = (fakeData?) => {
  const data = fakeData || readTextFile(dataPath);
  const driveMap = DriveMap.fromText(data);
  driveMap.defragAll(false);
  return driveMap.checksum;
}

export const part2Solution = (fakeData?) => {
  const data = fakeData || readTextFile(dataPath);
  const driveMap = DriveMap.fromText(data);
  driveMap.defragAll(true);
  return driveMap.checksum;
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

// main();