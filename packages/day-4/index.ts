export const checkPosition = (data: string[], targetWord: string, centerx: number, centery: number) => (offset: number, character?: string) => (xdirection: number, ydirection: number) => {
  const targetChar = character || targetWord.charAt(offset);
  const xpos = centerx + offset * xdirection;
  const ypos = centery + offset * ydirection;
  if (xpos < 0 || ypos < 0 || xpos >= data[0].length || ypos >= data.length) {
    return false;
  }
  return data[ypos].charAt(xpos) === targetChar;
};

export const followStart = (data: string[], targetWord: string) => (xpos: number, ypos: number) => {
  let targetCharPos = 1;
  const grid:(Coordinates|null)[][] = [
    [[-1, -1], [0, -1], [1, -1]],
    [[-1,  0],        , [1,  0]],
    [[-1,  1], [0,  1], [1,  1]],
  ];
  let results = grid.flat();
  
  while (targetCharPos < targetWord.length && results.length > 0) {
    const check = checkPosition(data, targetWord, xpos, ypos)(targetCharPos);
    results = results.filter((coordinates) => check(...coordinates));
    targetCharPos++;
  }
  return results.length;
};

export const getLetter = (data: string[]) => (xpos: number, ypos: number) => {
  if (xpos < 0 || ypos < 0 || xpos >= data[0].length || ypos >= data.length) {
    return;
  }
  return data[ypos].charAt(xpos);
};

export const followMiddle = (data: string[], targetWord) => (xpos: number, ypos: number) => {
  const letterAt = getLetter(data);
  const grid:(string|undefined)[][] = [
    [letterAt(xpos - 1, ypos - 1), letterAt(xpos + 1, ypos - 1)],
    [letterAt(xpos -1 , ypos + 1), letterAt(xpos + 1, ypos +1)],
  ];
  const targets = [targetWord[0], targetWord[2]];
  return targets.every((letter) => [grid[0][0], grid[1][1]].includes(letter)) &&
    targets.every((letter) => [grid[0][1], grid[1][0]].includes(letter));
};

export type Coordinates = [xpos: number, ypos: number];

export const findStartPositions = (data: string[], letter: string) => {
  const startingPositions: Coordinates[] = [];
  const NOT_FOUND = -1;
  data.forEach((row, ypos) => {
    let xpos = row.indexOf(letter);
    while (xpos !== NOT_FOUND) {
      startingPositions.push([xpos, ypos]);
      if (xpos < row.length) {
        xpos = row.indexOf(letter, xpos + 1);
      }
      else {
        xpos = NOT_FOUND;
      }
    }
  });
  return startingPositions;
};
