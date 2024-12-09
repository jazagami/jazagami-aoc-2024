import { readTextFile } from '@jazagami-aoc-2024/day-3';
import * as path from 'path';
import { getAntennaLocations, getAdjacentAntinodes, getAllAntinodes } from './index.ts';

let dataPath;
try {
  dataPath = require.resolve('./data.txt');
}
catch (error) {
  dataPath = path.resolve('./data.txt');
}

export const part1Solution = (fakeData?) => {
  const data = fakeData || readTextFile(dataPath);
  const antennaMap = getAntennaLocations(data);
  [...antennaMap.antennas].forEach(([antennaName, locations]) => {
    antennaMap.antinodes.set(antennaName, getAdjacentAntinodes(locations, [antennaMap.width, antennaMap.height]));
  });
  const uniqueAntinodes = new Set<string>();
  [...antennaMap.antinodes.values()].forEach((coordinateList) => {
    coordinateList.forEach((coordinate) => {
      uniqueAntinodes.add(coordinate.toString());
    });
  });

  return uniqueAntinodes.size;
}

export const part2Solution = (fakeData?) => {
  const data = fakeData || readTextFile(dataPath);
  const antennaMap = getAntennaLocations(data);
  [...antennaMap.antennas].forEach(([antennaName, locations]) => {
    antennaMap.antinodes.set(antennaName, getAllAntinodes(locations, [antennaMap.width, antennaMap.height]));
  });
  const uniqueAntinodes = new Set<string>();
  [...antennaMap.antinodes.values()].forEach((coordinateList) => {
    coordinateList.forEach((coordinate) => {
      uniqueAntinodes.add(coordinate.toString());
    });
  });

  return uniqueAntinodes.size;
};

export const main = () => {
  console.log(`Part 1: ${part1Solution()}`);
  console.log(`Part 2: ${part2Solution()}`);
};

// main();