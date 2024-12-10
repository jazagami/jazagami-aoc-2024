export type File = {
  id: number,
  blockSize: number,
  freeSpace: number,
};

export class DriveMap {
  private locations: Map<number, number>;
  private emptyLocations: number[];

  get size() {
    return this.locations.size + this.emptyLocations.length;
  }

  get checksum() {
    return [...this.locations].reduce((aggregate, [index, id]) => {
      return aggregate + (id * index);
    }, 0);
  }

  constructor() {
    this.locations = new Map();
    this.emptyLocations = [];
  }

  static fromText(data: string) {
    const fileList: File[] = [];
    const driveMap = new DriveMap();

    for (let i = 0; i < data.length; i+=2) {
      const fileInfo: File = {
        id: i / 2,
        blockSize: Number.parseInt(data.charAt(i)),
        freeSpace: Number.parseInt(data.charAt(i + 1)),
      };
      fileList.push(fileInfo);
    }

    fileList.forEach((file) => {
      driveMap.addFile(file);
    });
  
    return driveMap;
  }

  moveLocation(from: number, to: number) {
    if (this.locations.get(to) !== undefined) {
      throw `Attempting to overwrite data at location ${to}.`;
    }
    if (from < 0 || from == null || to < 0 || to == null) {
      throw `Invalid input: attempting to move from ${from} to ${to}`;
    }
    this.locations.set(to, this.locations.get(from));
    this.locations.delete(from);
    this.emptyLocations.push(from);
    if (from < this.emptyLocations[this.emptyLocations.length - 2]) {
      this.emptyLocations.sort((a, b) => a - b);
    }
    const emptyLocationsIndex = this.emptyLocations.indexOf(to);
    if (emptyLocationsIndex > -1) {
      this.emptyLocations.splice(emptyLocationsIndex, 1);
    }
  };

  defragFrom(startingLocation: number, keepIntact: boolean = true) {
    if (!keepIntact) {
      if (startingLocation > this.emptyLocations[0]) {
        this.moveLocation(startingLocation, this.emptyLocations[0]);
      }
    }
    else {
      const idLocations = [startingLocation];
      const id = this.locations.get(startingLocation);
      let nextLocation = startingLocation - 1;
      while (this.locations.get(nextLocation) === id) {
        idLocations.push(nextLocation);
        nextLocation--;
      }
      const emptySpaceStart = this.findEmptySpace(idLocations.length);
      if (emptySpaceStart !== undefined && emptySpaceStart < startingLocation) {
        let emptySpaceTarget = emptySpaceStart;
        idLocations.forEach(function(key) {
          this.moveLocation(key, emptySpaceTarget);
          emptySpaceTarget++;
        }.bind(this));
      }
    }
  }

  defragAll(keepIntact: boolean = true) {
    // if (keepIntact) {
    //   let lastOccupiedLocation = Math.max(...this.locations.keys());
    //   while (lastOccupiedLocation > Math.min(...this.emptyLocations)) {
    //     this.defragFrom(lastOccupiedLocation, keepIntact);
    //     lastOccupiedLocation = Math.max(...this.locations.keys());
    //   }
    // }
    // else {
      let id;
      [...this.locations.keys()].toReversed().forEach(function(key) {
        if (!keepIntact || id != this.locations.get(key)) {
          this.defragFrom(key, keepIntact);
        }
        id = this.locations.get(key);
      }.bind(this));
    // }
  }

  getLastKnownLocation() {
    return Math.max(-1, ...this.locations.keys(), ...this.emptyLocations);
  }

  addFile({blockSize, id, freeSpace}: File) {
    const startingIndex = this.getLastKnownLocation() + 1;
    let location = startingIndex;
    for (let i = 0; i < blockSize; i++, location++) {
      this.locations.set(location, id);
    }
    for (let i = 0; i < freeSpace; i++, location++) {
      this.emptyLocations.push(location);
    }
  }

  findEmptySpace(length: number) {
    let sequentialCount = 1, lastValue = this.emptyLocations[0], startingIndex = 0;
    for (let i = 1; i < this.emptyLocations.length; i++) {
      if (sequentialCount === length) {
        return this.emptyLocations[startingIndex];
      }
      if (this.emptyLocations[i] === lastValue + 1) {
        sequentialCount++;
      }
      else {
        sequentialCount = 1;
        startingIndex = i;
      }
      lastValue = this.emptyLocations[i];
    }
  }

  debug() {
    return [...this.locations.keys(), ...this.emptyLocations].sort((a, b) => a-b).map(key => this.locations.get(key) ?? '.').join('');
  }
};

