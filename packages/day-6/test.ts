import { part1Solution, part2Solution } from './main.ts';
const testData =
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe('day 6', () => {
  describe('part 1', () => {
    it('should match testData', () => {
      expect(part1Solution(testData)).toBe(41);
    });
    it('should match the solution', () => {
      expect(part1Solution()).toBe(4602);
    });
  });
  describe('part 2', () => {
    it('should match test data', () => {
      expect(part2Solution(testData)).toBe(6);
    });
    it('should match the solution', () => {
      expect(part2Solution()).not.toBe(2);
      expect(part2Solution()).toBe(1703);
    });
  });
});