import { part1Solution, part2Solution } from './main.ts';
const testData = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

describe('day 1', () => {
  describe('part 2', () => {
    it('should match testData', () => {
      expect(part1Solution(testData)).toBe(2);
    });
    it('should match the solution', () => {
      expect(part1Solution()).toBe(483);
    });
  });
  describe('part 2', () => {
    it('should match test data', () => {
      expect(part2Solution(testData)).toBe(4);
    });
    it('should match the solution', () => {
      expect(part2Solution()).toBe(528);
    });
  });
});