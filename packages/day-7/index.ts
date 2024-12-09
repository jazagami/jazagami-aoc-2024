export const parseEquationOperands = (dataItem: string) => {
  const operands = dataItem.split(/[:\s]+/).map((value) => Number.parseInt(value));
  operands.forEach((value, index) => {
    if (isNaN(value)) {
      throw `Invalid input in ${dataItem}. Encountered NaN.`;
    }
  });
  return operands;
};

export type Operator = {
  name: string,
  operation: (a: number, b: number) => number,
}

export const DEFAULT_OPERATORS: Operator[] = [
  {
    name: 'ADDITION',
    operation: (a, b) => a + b,
  },
  {
    name: 'MULTIPLICATION',
    operation: (a, b) => a * b,
  },
];



export const canEqual = (equals: number, operands: number[], validOperators: Operator[] = DEFAULT_OPERATORS): boolean => {
  const [a, b, ...rest] = operands;

  /**
   * Traverse this like a tree
   *      a
   *    +   *
   */
  if (rest.length === 0) {
    return validOperators.some(operator => operator.operation(a, b) === equals);
  }
  if (a > equals) {
    return false;
  }
  return validOperators.some((operator) => {
    return canEqual(equals, [operator.operation(a,b), ...rest], validOperators);
  });
};
