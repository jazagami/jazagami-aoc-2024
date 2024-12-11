import { part1Solution, part2Solution } from './main.ts';
const testData = 
`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe('day 10', () => {
  describe('part 1', () => {
    it('should match testData', () => {
      expect(part1Solution(testData)).toBe(36);
    });
    it('should match the solution', () => {
      expect(part1Solution()).toBe(811);
    });
  });
  describe('part 2', () => {
    it('should match test data', () => {
      expect(part2Solution(testData)).toBe(81);
    });
    it('should match the solution', () => {
      expect(part2Solution()).toBe(1794);
    });
  });
});