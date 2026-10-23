import { describe, it, expect } from 'vitest';
import {
  rekey,
  scoreResponses,
  formatScore,
  classifyRegion,
  REGION_PROTOTYPES,
  normalizeResponses
} from '../src/domain/ecr-rs.js';

describe('ECR-RS Scoring Engine (§6 Specification)', () => {
  describe('rekey function', () => {
    it('inverts 1-7 scale correctly: 8 - x', () => {
      expect(rekey(1)).toBe(7);
      expect(rekey(2)).toBe(6);
      expect(rekey(3)).toBe(5);
      expect(rekey(4)).toBe(4);
      expect(rekey(5)).toBe(3);
      expect(rekey(6)).toBe(2);
      expect(rekey(7)).toBe(1);
    });

    it('throws on out-of-range responses', () => {
      expect(() => rekey(0)).toThrow();
      expect(() => rekey(8)).toThrow();
      expect(() => rekey(null)).toThrow();
    });
  });

  describe('PRD §6.4 Psychometric Test Vectors', () => {
    it('Test Vector 1: Maximum security / low anxiety & avoidance', () => {
      // Raw: 7,7,7,7,1,1,1,1,1
      // Rekeyed i1-i4: 1,1,1,1; + i5-i6 (1,1) => 6/6 = 1.00
      // Anxiety i7-i9: 1,1,1 => 3/3 = 1.00
      const responses = [7, 7, 7, 7, 1, 1, 1, 1, 1];
      const result = scoreResponses(responses);

      expect(result.avoidance).toBeCloseTo(1.00, 4);
      expect(result.anxiety).toBeCloseTo(1.00, 4);
      expect(formatScore(result.avoidance)).toBe('1.00');
      expect(formatScore(result.anxiety)).toBe('1.00');

      const region = classifyRegion(result.avoidance, result.anxiety);
      expect(region.prototype).toBe(REGION_PROTOTYPES.SECURE);
    });

    it('Test Vector 2: Maximum insecurity / high anxiety & avoidance (fearful)', () => {
      // Raw: 1,1,1,1,7,7,7,7,7
      // Rekeyed i1-i4: 7,7,7,7; + i5-i6 (7,7) => 42/6 = 7.00
      // Anxiety i7-i9: 7,7,7 => 21/3 = 7.00
      const responses = [1, 1, 1, 1, 7, 7, 7, 7, 7];
      const result = scoreResponses(responses);

      expect(result.avoidance).toBeCloseTo(7.00, 4);
      expect(result.anxiety).toBeCloseTo(7.00, 4);
      expect(formatScore(result.avoidance)).toBe('7.00');
      expect(formatScore(result.anxiety)).toBe('7.00');

      const region = classifyRegion(result.avoidance, result.anxiety);
      expect(region.prototype).toBe(REGION_PROTOTYPES.FEARFUL);
    });

    it('Test Vector 3: Exact midpoint responses (4.00, 4.00)', () => {
      // Raw: 4,4,4,4,4,4,4,4,4
      // Rekeyed i1-i4: 4,4,4,4; + i5-i6 (4,4) => 24/6 = 4.00
      // Anxiety i7-i9: 4,4,4 => 12/3 = 4.00
      const responses = [4, 4, 4, 4, 4, 4, 4, 4, 4];
      const result = scoreResponses(responses);

      expect(result.avoidance).toBeCloseTo(4.00, 4);
      expect(result.anxiety).toBeCloseTo(4.00, 4);
      expect(formatScore(result.avoidance)).toBe('4.00');
      expect(formatScore(result.anxiety)).toBe('4.00');

      const region = classifyRegion(result.avoidance, result.anxiety);
      expect(region.isNearBorder).toBe(true);
      expect(region.borderNotes).toContain('near the border on avoidance');
      expect(region.borderNotes).toContain('near the border on anxiety');
    });

    it('Test Vector 4: PRD Row 4 calculation (Avoidance: 2.50, Anxiety: 5.00)', () => {
      // Raw: 6,5,6,5,2,3,5,4,6
      // Rekeyed i1-i4: 2,3,2,3; + i5-i6 (2,3) => 15/6 = 2.50
      // Anxiety i7-i9: 5,4,6 => 15/3 = 5.00
      const responses = [6, 5, 6, 5, 2, 3, 5, 4, 6];
      const result = scoreResponses(responses);

      expect(result.avoidance).toBeCloseTo(2.50, 4);
      expect(result.anxiety).toBeCloseTo(5.00, 4);
      expect(formatScore(result.avoidance)).toBe('2.50');
      expect(formatScore(result.anxiety)).toBe('5.00');

      const region = classifyRegion(result.avoidance, result.anxiety);
      expect(region.prototype).toBe(REGION_PROTOTYPES.ANXIOUS);
      expect(region.description).toBe("most like the anxious (preoccupied) prototype");
    });
  });

  describe('Input validation & formats', () => {
    it('accepts 1-indexed object map as responses', () => {
      const objResponses = {
        1: 6, 2: 5, 3: 6, 4: 5, 5: 2, 6: 3, 7: 5, 8: 4, 9: 6
      };
      const result = scoreResponses(objResponses);
      expect(result.avoidance).toBeCloseTo(2.50, 4);
      expect(result.anxiety).toBeCloseTo(5.00, 4);
    });

    it('rejects partial or missing answers', () => {
      expect(() => scoreResponses([1, 2, 3, 4, 5])).toThrow('Expected exactly 9 responses');
      expect(() => scoreResponses({ 1: 5, 2: 4 })).toThrow('Missing response for item 3');
    });

    it('rejects out of range values', () => {
      expect(() => scoreResponses([8, 1, 1, 1, 1, 1, 1, 1, 1])).toThrow();
      expect(() => scoreResponses([0, 1, 1, 1, 1, 1, 1, 1, 1])).toThrow();
    });
  });

  describe('Border band detection', () => {
    it('detects coordinates within +/-0.5 of midpoint 4.0', () => {
      const regionBorder = classifyRegion(4.2, 2.0);
      expect(regionBorder.isNearBorder).toBe(true);
      expect(regionBorder.borderNotes).toContain('near the border on avoidance');

      const regionClear = classifyRegion(2.0, 2.0);
      expect(regionClear.isNearBorder).toBe(false);
    });
  });
});
