import { part1Solution, part2Solution } from './main.ts';
const testData = [
  '190: 10 19',
  '3267: 81 40 27',
  '83: 17 5',
  '156: 15 6',
  '7290: 6 8 6 15',
  '161011: 16 10 13',
  '192: 17 8 14',
  '21037: 9 7 18 13',
  '292: 11 6 16 20`',
];

describe('day 7', () => {
  describe('part 1', () => {
    it('should match testData', () => {
      expect(part1Solution(testData)).toBe(3749);
    });
    it('should match the solution', () => {
      expect(part1Solution()).toBe(850435817339);
    });
  });
  describe('part 2', () => {
    it('should match test data', () => {
      expect(part2Solution(testData)).toBe(11387);
    });
    it('should match the solution', () => {
      expect(part2Solution()).toBe(104824810233437);
    });
  });
});