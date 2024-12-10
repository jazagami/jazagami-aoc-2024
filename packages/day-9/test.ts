import { part1Solution, part2Solution } from './main.ts';
const testData = '2333133121414131402';

describe('day 9', () => {
  describe('part 1', () => {
    it('should match testData', () => {
      expect(part1Solution(testData)).toBe(1928);
    });
    it('should match the solution', () => {
      expect(part1Solution()).toBe(6323641412437);
    });
  });
  describe('part 2', () => {
    it('should match test data', () => {
      expect(part2Solution(testData)).toBe(2858);
    });
    it('should match the solution', () => {
      expect(part2Solution()).toBe(6351801932670);
    });
  });
});