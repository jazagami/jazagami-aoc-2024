import * as fs from 'fs';

export const readTextFile = (filePath: string) => {
  const fileContentBuffer: Buffer = fs.readFileSync(filePath);
  return fileContentBuffer.toString();
};

export const performMultiplication = (text: string) => {
  const MUL_REGEX = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;

  let results = MUL_REGEX.exec(text);
  let sum = 0;
  while (results) {
    const [ _fullMatch, firstArg, secondArg ] = results;
    const firstNumber = Number.parseInt(firstArg);
    const secondNumber = Number.parseInt(secondArg);

    if (isNaN(firstNumber) ||  isNaN(secondNumber)) {
      throw `Invalid arguments: Expected ${firstArg}, ${secondArg} to be a number.`;
    }

    sum += (firstNumber * secondNumber);

    results = MUL_REGEX.exec(text);
  }
  return sum;
};

export const getEnabledSections = (text: string) => {
  const DO_DONT_REGEX = /(^|(do|don't)\(\))(?:(?!(do|don't)\(\)).)*/gs;

  let results = DO_DONT_REGEX.exec(text);
  const enabledSections: string[] = [];
  while (results) {
    const [fullMatch, verb] = results;
    if (verb !== "don't()") {
      enabledSections.push(fullMatch);
    }
    results = DO_DONT_REGEX.exec(text);
  }
  return enabledSections;
};
