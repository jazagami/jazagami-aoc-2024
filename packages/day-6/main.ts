import * as path from 'path';
import { readTextFile } from '@jazagami-aoc-2024/day-3/index.ts';
import { LabMap } from './index.ts';
import { Coordinates } from '../day-4/index.ts';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = (fakeData?: string) => {
  const data = fakeData || readTextFile(dataPath);
  const labMap = new LabMap(data);
  while (labMap.containsGuard) {
    labMap.moveGuard();
  }
  return labMap.guardLocationHistory.size;
}

export const part2Solution = (fakeData?) => {
  let count = 0;
  const data = fakeData || readTextFile(dataPath);
  const labMapTemplate = new LabMap(data);
  const labMap = LabMap.fromStartingData(labMapTemplate);
  while (labMap.containsGuard) {
    labMap.moveGuard();
  }
  const guardLocationHistory = labMap.guardLocationHistory;
  return [...guardLocationHistory].filter((locationString) => {
    const newPosition = (locationString.split(',').map((coordinate) => Number.parseInt(coordinate.trim()))) as Coordinates;
    // Don't place the obstacle at the starting location
    if (newPosition[0] === labMapTemplate.guardPosition[0] && newPosition[1] === labMapTemplate.guardPosition[1]) {
      return false;
    }
    const newMap = LabMap.fromStartingData(labMapTemplate);
    newMap.setNewObstacle(newPosition);
    while (newMap.containsGuard && !newMap.isGuardInALoop) {
      newMap.moveGuard();
    }
    count++;
    return newMap.isGuardInALoop;
  }).length;
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

main();