import { readTextFile } from '@jazagami-aoc-2024/day-3';
import * as path from 'path';
import { getMap, getDistinctTrailCount, getTrailHeads } from './index.ts';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = (fakeData?) => {
  const data = fakeData || readTextFile(dataPath);
  const topologicalMap = getMap(data);
  const trailHeads = getTrailHeads(topologicalMap);
  return trailHeads.reduce((aggregate, trailhead) => aggregate + trailhead.distinctTrailEndsCount, 0);
}

export const part2Solution = (fakeData?) => {
  const data = fakeData || readTextFile(dataPath);
  const topologicalMap = getMap(data);
  const trailHeads = getTrailHeads(topologicalMap);
  return getDistinctTrailCount(trailHeads);
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

main();