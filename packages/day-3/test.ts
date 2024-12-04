import { part1Solution, part2Solution } from './main.ts';
const testData = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
const testData2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

describe('day 3', () => {
  describe('part 1', () => {
    it('should match testData', () => {
      expect(part1Solution(testData)).toBe(161);
    });
    it('should match the solution', () => {
      expect(part1Solution()).toBe(167650499);
    });
  });
  describe('part 2', () => {
    it('should match test data', () => {
      expect(part2Solution(testData2)).toBe(48);
    });
    it('should match the solution', () => {
      expect(part2Solution()).toBeGreaterThan(94921724);
      expect(part2Solution()).toBeLessThan(163037113);
      expect(part2Solution()).toBe(95846796);
    });
  });
});