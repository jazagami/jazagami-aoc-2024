import { part1Solution, part2Solution } from './main.ts';
const testData =
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.split('\n');

describe('day 4', () => {
  describe('part 1', () => {
    it('should match testData', () => {
      expect(part1Solution(testData)).toBe(18);
    });
    it('should match the solution', () => {
      expect(part1Solution()).toBe(2401);
    });
  });
  describe('part 2', () => {
    it('should match test data', () => {
      expect(part2Solution(testData)).toBe(9);
    });
    it('should match the solution', () => {
      expect(part2Solution()).toBe(1822);
    });
  });
});