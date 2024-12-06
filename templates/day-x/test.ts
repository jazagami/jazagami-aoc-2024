import { part1Solution, part2Solution } from './main.ts';
const testData = [
];

describe('day {x}', () => {
  describe('part 1', () => {
    it('should match testData', () => {
      expect(part1Solution(testData)).toBe(0);
    });
    it('should match the solution', () => {
      expect(part1Solution()).toBe(0);
    });
  });
  describe('part 2', () => {
    it('should match test data', () => {
      expect(part2Solution(testData)).toBe(0);
    });
    it('should match the solution', () => {
      expect(part2Solution()).toBe(0);
    });
  });
});