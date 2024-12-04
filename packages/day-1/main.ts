import { getDataColumns, calculateDistances, getNumberOfOccurences } from './index.ts';
import * as path from 'path';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = () => {
  const lists = getDataColumns(dataPath);
  const distances = calculateDistances(lists[0], lists[1]);
  return distances.reduce((aggregate, distance) => {
    return aggregate + distance;
  }, 0);
}

export const part2Solution = () => {
  const lists = getDataColumns(dataPath);
  const similarities = lists[0].map((target) => {
    return target * getNumberOfOccurences(target, lists[1]);
  });
  return similarities.reduce((aggregate, similarity) => {
    return aggregate + similarity;
  }, 0);
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

main();