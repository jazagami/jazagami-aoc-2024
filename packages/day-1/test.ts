import { part1Solution, part2Solution } from './main';

describe('day 1', () => {
  describe('part 1', () => {
    it('should match the solution', () => {
      expect(part1Solution()).toBe(1882714);
    });
  });
  describe('part 2', () => {
    it('should match the solution', () => {
      expect(part2Solution()).toBe(19437052);
    });
  });
});