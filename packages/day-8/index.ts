import { Coordinates } from "../day-4/index.ts";

export type AntennaMap = {
  width: number,
  height: number,
  antennas: Map<string, Coordinates[]>,
  antinodes: Map<string, Coordinates[]>,
};

export const getAntennaLocations = (data: string): AntennaMap => {
  const lines = data.split(/[\n\r]+/g);
  const map: AntennaMap = {
    width: lines[0].length,
    height: lines.length,
    antennas: new Map(),
    antinodes: new Map(),
  }
  lines.forEach((row, y) => {
    const ANTENNA_FINDER = /[a-z0-9]/gi;
    let antennas = ANTENNA_FINDER.exec(row);
    while (antennas) {
      const antennaType = antennas[0];
      const antennaLocations = map.antennas.get(antennaType) || [];
      if (!map.antennas.has(antennaType)) {
        map.antennas.set(antennaType, antennaLocations);
      }
      antennaLocations.push([antennas.index, y]);
      antennas = ANTENNA_FINDER.exec(row);
    }
  });
  return map;
};

export const getAdjacentAntinodes = (coordinateSets: Coordinates[], dimensions: Coordinates) => {
  const antinodes = [];
  for (let i = 0; i < coordinateSets.length - 1; i++) {
    const [xa, ya] = coordinateSets[i];
    for (let j = i + 1; j < coordinateSets.length; j++) {
      if (i === j) {
        continue;
      }
      const [xb, yb] = coordinateSets[j];
      const [velocityX, velocityY] = [xb - xa, yb - ya];
      const firstPoint = [xa - velocityX, ya - velocityY];
      const secondPoint = [xb + velocityX, yb + velocityY];

      const pointsInPath = [firstPoint, secondPoint].filter((coorindates: Coordinates) => isNodeInBounds(coorindates, dimensions));
      antinodes.push(...pointsInPath);
    }
  }
  return antinodes;
};

export const isNodeInBounds = ([x, y]: Coordinates, [width, height]: Coordinates) => {
  return x >= 0 &&
    x < width &&
    y >= 0 &&
    y < height;
};

export const getAllAntinodes = (coordinateSets: Coordinates[], dimensions: Coordinates) => {
  const antinodes = [];
  for (let i = 0; i < coordinateSets.length - 1; i++) {
    const [xa, ya] = coordinateSets[i];
    for (let j = i + 1; j < coordinateSets.length; j++) {
      if (i === j) {
        continue;
      }
      const [xb, yb] = coordinateSets[j];
      const [velocityX, velocityY] = [xb - xa, yb - ya];
      let scalar = 0;
      let inBounds = true;
      while (inBounds) {
        inBounds = false;
        const scaledVelocityX = velocityX * scalar;
        const scaledVelocityY = velocityY * scalar;
        const increasingPoint: Coordinates = [xb + scaledVelocityX, yb + scaledVelocityY];
        const decreasingPoint: Coordinates = [xa - scaledVelocityX, ya - scaledVelocityY];

        if (isNodeInBounds(increasingPoint, dimensions)) {
          inBounds = true;
          antinodes.push(increasingPoint);
        }
        if (isNodeInBounds(decreasingPoint, dimensions)) {
          inBounds = true;
          antinodes.push(decreasingPoint);
        }
        scalar++;
      }
    }
  }
  return antinodes;
};