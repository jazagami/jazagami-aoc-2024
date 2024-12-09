import * as fs from 'fs';

export const getDataLines = (filePath: string) => {
  const fileContentBuffer: Buffer = fs.readFileSync(filePath);
  const fileContent:string = fileContentBuffer.toString();
  return fileContent.split(/[\r\n]+/);
}

export const getDataColumns = (filePath: string) => {
  const columns:Array<number[]> = [];
  const lines = getDataLines(filePath);
  lines.map((line, lineNumber) => {
    const SEPARATOR=',';
    const items = line.trim().replaceAll(/\s+/g, SEPARATOR).split(SEPARATOR);
    const numbers = items.map((value) => Number.parseInt(value));
    if (numbers.some((value) => isNaN(value))) {
      throw `Invalid input: ${numbers.join(', ')}. Expected type: Number`;
    }

    numbers.forEach((value, index) => {
      if (lineNumber === 0) {
        columns[index] = [value];
      }
      else {
        columns[index].push(value);
      }
    });
  });

  for (let i = 1; i < columns.length; i++) {
    if (columns[i].length !== columns[0].length) {
      throw `Invalid input: Columns of lengths ${columns.map(list => list.length).join(', ')} must be equal`;
    }
  }
  
  return columns;
};

export const getDataRows = (filePath: string) => {
  const rows:Array<number[]> = getDataLines(filePath).map((line) => {
    const SEPARATOR=',';
    const items = line.trim().replaceAll(/\s+/g, SEPARATOR).split(SEPARATOR);
    const numbers = items.map((value) => Number.parseInt(value));
    if (numbers.some((value) => isNaN(value))) {
      throw `Invalid input: ${numbers.join(', ')}. Expected type: Number`;
    }
    return numbers;
  });
  // for (let i = 1; i < rows.length; i++) {
  //   if (rows[i].length !== rows[0].length) {
  //     throw `Invalid input: Rows of lengths ${rows.map(list => list.length).join(', ')} must be equal`;
  //   }
  // }
  
  return rows;
};

export const calculateDistances = (firstList: number[], secondList: number[]) => {
  const firstSorted: number[] = firstList.toSorted(), secondSorted: number[] = secondList.toSorted();
  return firstSorted.map((item1, index) => {
    return Math.abs(item1 - secondSorted[index]);
  });
};

export const getNumberOfOccurences = (target, list: Array<typeof target>) => {
  return list.reduce((aggregate, item) => {
    if (item === target) {
      return aggregate + 1;
    }
    return aggregate;
  }, 0);
};
