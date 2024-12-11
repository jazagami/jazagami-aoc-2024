import { Coordinates } from "../day-4/index.ts";

export type TrailHead = {
  coordinates: Coordinates,
  trailCount: number,
  distinctTrailEndsCount: number,
  trailEnds: Coordinates[],
};

export const getMap = (data: string) => {
  return data.split(/[\r\n]+/g).map((line) => {
    return line.split('').map(character => Number.parseInt(character));
  });
};

/**
 * Misread part 1 and ended up with the solution for part 2 before I was ready for it.
 * Had to leave this here for posterity.
 */
export const getTrailCount = (map, coordinates: Coordinates, startingValue: number = 0):number => {
  const COMPLETE_TRAIL_HEIGHT = 9;
  const coordinateInBounds = coordinateInBoundsProvider(map);
  const coordinateValue = getCoordinateValue(map, ...coordinates);
  if (coordinateValue != startingValue) {
    return 0;
  }
  if (coordinateValue === COMPLETE_TRAIL_HEIGHT) {
    return 1;
  }
  const adjacentCoordinates: Coordinates[] = getAdjacentCoordinates(map, coordinates);
  return adjacentCoordinates.filter(coordinateInBounds).reduce((aggregate, adjacentLocation) => {
    return aggregate + getTrailCount(map, adjacentLocation, startingValue + 1);
  }, 0);
};

export const getTrailEnds = (map, coordinates: Coordinates, startingValue: number = 0): Coordinates[] => {
  const COMPLETE_TRAIL_HEIGHT = 9;
  const coordinateInBounds = coordinateInBoundsProvider(map);
  const coordinateValue = getCoordinateValue(map, ...coordinates);
  if (coordinateValue != startingValue) {
    return [];
  }
  if (coordinateValue === COMPLETE_TRAIL_HEIGHT) {
    return [coordinates];
  }
  const adjacentCoordinates: Coordinates[] = getAdjacentCoordinates(map, coordinates);
  return adjacentCoordinates.filter(coordinateInBounds).reduce((aggregate, adjacentLocation) => {
    return [...aggregate, ...getTrailEnds(map, adjacentLocation, startingValue + 1)];
  }, []);
};

export const coordinateInBoundsProvider =  (map: number[][]) => ([x,y]: Coordinates) => {
  return x >= 0 &&
    y >= 0 &&
    x < map[0].length &&
    y < map.length;
};

export const findTrails = (map: number[][], trailhead: TrailHead) => {
  trailhead.trailEnds = getTrailEnds(map, trailhead.coordinates);
  trailhead.trailCount = trailhead.trailEnds.length;
  trailhead.distinctTrailEndsCount = new Set(trailhead.trailEnds.map(coordinates => coordinates.toString())).size;
};

export const getCoordinateValue = (map: number[][], x: number, y:number) => {
  return map[y][x];
};

export const getAdjacentCoordinates = (map: number[][], coordinates: Coordinates): Coordinates[] => {
  const [x, y] = coordinates;
  return [
    [ x, y - 1 ],
    [ x - 1, y ],
    [ x, y + 1 ],
    [ x + 1, y ],
  ];
};

export const getTrailHeads = (topologicalMap: number[][]): TrailHead[] => {
  const trailHeads: TrailHead[] = topologicalMap.reduce((aggregate: TrailHead[], row, y) => {
    let x = row.indexOf(0);
    const rowTrailHeads: TrailHead[] = [];
    while (x > -1) {
      rowTrailHeads.push({
        coordinates: [x,y],
        trailCount: 0,
        trailEnds: [],
        distinctTrailEndsCount: 0
      });
      x = row.indexOf(0, x + 1);
    }
    return [...aggregate, ... rowTrailHeads];
  }, []);
  trailHeads.forEach((trailHead) => {
    findTrails(topologicalMap, trailHead);
  });
  return trailHeads;
};

export const getDistinctTrailCount = (trailHeads: TrailHead[]) => {
  return trailHeads.reduce((aggregate: number, trailHead) => {
    return aggregate + trailHead.trailCount;
  }, 0);
};
