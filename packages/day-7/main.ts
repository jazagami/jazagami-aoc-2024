import { getDataLines } from '@jazagami-aoc-2024/day-1';
import * as path from 'path';
import { parseEquationOperands, canEqual, DEFAULT_OPERATORS, type Operator } from './index.ts';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = (fakeData?: string[]) => {
  const data = fakeData || getDataLines(dataPath);
  const operands = data.map(parseEquationOperands);
  return operands
    .filter(([equals, ...operands]) => canEqual(equals, operands))
    .map(([equals, ..._others]) => equals)
    .reduce((aggregate, item) => aggregate + item, 0);
}

export const part2Solution = (fakeData?) => {
  const operators: Operator[] = [
    ...DEFAULT_OPERATORS,
    {
      name: 'CONCATENATION',
      operation: (a, b) => {
        return Number.parseInt(`${a}${b}`);
      }
    }
  ];
  const data = fakeData || getDataLines(dataPath);
  const operands = data.map(parseEquationOperands);
  return operands
    .filter(([equals, ...operands]) => canEqual(equals, operands, operators))
    .map(([equals, ..._others]) => equals)
    .reduce((aggregate, item) => aggregate + item, 0);
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

main();