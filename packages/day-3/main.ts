import * as path from 'path';
import { performMultiplication, readTextFile, getEnabledSections } from './index.ts';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = (fakeData?) => {
  const data = fakeData || readTextFile(dataPath);
  return performMultiplication(data);
}

export const part2Solution = (fakeData?) => {
  const data = fakeData || readTextFile(dataPath);
  const enabledSections = getEnabledSections(data);
  return enabledSections.reduce((aggregate, section) => {
    return performMultiplication(section) + aggregate;
  }, 0);
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

main();