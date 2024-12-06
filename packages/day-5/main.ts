import * as path from 'path';
import { readTextFile } from '../day-3/index.ts';
import { parseData, doesDataFitRules, getMiddleValue, reorderToFitRules } from './index.ts';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = (fakeData?) => {
  const data = (fakeData || readTextFile(dataPath)).split('\n');
  const {rules, scenarios} = parseData(data);
  return scenarios.filter((scenario) => doesDataFitRules(scenario, rules)).map(getMiddleValue).reduce((agg, value) => agg + value, 0);
}

export const part2Solution = (fakeData?) => {
  const data = (fakeData || readTextFile(dataPath)).split('\n');
  const {rules, scenarios} = parseData(data);
  return scenarios.filter((scenario) => !doesDataFitRules(scenario, rules))
    .map((scenario) => reorderToFitRules(scenario, rules))
    .map(getMiddleValue)
    .reduce((agg, value) => agg + value, 0);
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

main();