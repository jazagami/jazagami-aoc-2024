import { Coordinates } from "../day-4/index.ts";

export class LabMap {
  constructor (mapLayout: string) {
    const lines = mapLayout.split('\n');
    const NON_EMPTY_SPACE_PARSER = /[^\.\r]/g;

    this.height = lines.length;
    this.width = lines[0].length;
    this.guardDirection = LabMap.DIRECTIONS[0];

    lines.forEach((line, y) => {
      let match = NON_EMPTY_SPACE_PARSER.exec(line);
      while (match) {
        const x = match.index;
        switch (match[0]) {
          case '#':
            this.obstacles.push([x, y]);
            break;
          case '^':
            this.guardPosition = [x, y];
            this.containsGuard = true;
            break;
          default:
            throw `Invalid character ${match[0]} at ${[x,y]}.`;
        } 
        match = NON_EMPTY_SPACE_PARSER.exec(line);
      }
    });
  }

  static readonly DIRECTIONS: Coordinates[] = [
    [0, 1],  // UP
    [1, 0],  // RIGHT
    [0, -1], //DOWN
    [-1, 0], //LEFT
  ];

  static fromStartingData(labMap: LabMap): LabMap {
    const newLabMap = new LabMap('');
    newLabMap.width = labMap.width;
    newLabMap.height = labMap.height;
    newLabMap.obstacles = [...labMap.obstacles];
    newLabMap.guardPosition = labMap.guardPosition;
    newLabMap.containsGuard = labMap.containsGuard;
    return newLabMap;
  }

  width: number;
  height: number;
  obstacles: Coordinates[] = [];
  _guardPosition: Coordinates;
  guardHistory: Coordinates[] = [];
  guardLocationHistory: Set<string> = new Set<string>();
  detailedGuardLocationHistory: Set<string> = new Set<string>();
  guardDirection: Coordinates;
  containsGuard: boolean = false;
  isGuardInALoop: boolean = false;

  set guardPosition(position: Coordinates) {
    const [targetX, targetY] = position;
    this._guardPosition = position;
    if (targetX >= this.width || targetX < 0 || targetY >= this.height || targetY < 0) {
      this.containsGuard = false;
    }
    if (this.containsGuard) {
      this.guardHistory.push(position);
      this.guardLocationHistory.add(`${position.toString()}`);
      const detailedLocation = `${position.toString()} ${this.guardDirection.toString()}`;
      if (this.detailedGuardLocationHistory.has(detailedLocation)) {
        this.isGuardInALoop = true;
      }
      else {
        this.detailedGuardLocationHistory.add(detailedLocation);
      }
    }
  }

  get guardPosition() {
    return this._guardPosition;
  }

  getGuardTargetPosition(): Coordinates {
    return [
      this.guardPosition[0] + this.guardDirection[0],
      this.guardPosition[1] - this.guardDirection[1]
    ];
  }

  rotateGuard() {
    const directionIndex = LabMap.DIRECTIONS.indexOf(this.guardDirection);
    this.guardDirection = LabMap.DIRECTIONS[(directionIndex + 1) % LabMap.DIRECTIONS.length];
  }

  moveGuard() {
    let [targetX, targetY] = this.getGuardTargetPosition();
    while (this.obstacles.some((obstacle) => {
      return obstacle[0] === targetX && obstacle[1] === targetY;
    })) {
      this.rotateGuard();
      [targetX, targetY] = this.getGuardTargetPosition();
    }
    this.guardPosition = [targetX, targetY];
  }

  setNewObstacle(position: Coordinates) {
    this.obstacles.push(position);
  }

  debug() {
    const debugMap:string[][] = [];
    for (let y = 0; y < this.height; y++) {
      const row = [];
      debugMap.push(row);
      for (let x = 0; x < this.width; x++) {
        if (this.obstacles.some((obstacle) => {
          return obstacle[0] === x && obstacle[1] === y;
        })) {
          row.push('#');
        } else if (this.guardPosition[0] === x && this.guardPosition[1] === y){
          switch (this.guardDirection) {
            case LabMap.DIRECTIONS[0]:
              row.push('^');
              break;
            case LabMap.DIRECTIONS[1]:
              row.push('>');
              break;
            case LabMap.DIRECTIONS[2]:
              row.push('Y');
              break;
            case LabMap.DIRECTIONS[3]:
              row.push('<');
              break;
          }
        } else {
          row.push('.');
        }
      }
    }
    return debugMap.map(line => line.join('')).join('\n');
  };
};