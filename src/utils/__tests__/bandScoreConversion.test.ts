/**
 * Unit tests for IELTS Band Score Conversion
 * Tests official IELTS Universal Scoring Methodology
 */

import {
  convertListeningToBand,
  convertReadingToBand,
  convertReadingGeneralTrainingToBand,
  calculateOverallBand,
  isValidBandScore,
} from '../bandScoreConversion';

describe('IELTS Band Score Conversion - Official Methodology', () => {
  
  describe('Listening Band Conversion', () => {
    test('should convert 39-40 correct answers to 9.0', () => {
      expect(convertListeningToBand(40)).toBe(9.0);
      expect(convertListeningToBand(39)).toBe(9.0);
    });

    test('should convert 37-38 correct answers to 8.5', () => {
      expect(convertListeningToBand(38)).toBe(8.5);
      expect(convertListeningToBand(37)).toBe(8.5);
    });

    test('should convert 35-36 correct answers to 8.0', () => {
      expect(convertListeningToBand(36)).toBe(8.0);
      expect(convertListeningToBand(35)).toBe(8.0);
    });

    test('should convert 30-31 correct answers to 7.0', () => {
      expect(convertListeningToBand(31)).toBe(7.0);
      expect(convertListeningToBand(30)).toBe(7.0);
    });

    test('should convert 23-25 correct answers to 6.0', () => {
      expect(convertListeningToBand(25)).toBe(6.0);
      expect(convertListeningToBand(24)).toBe(6.0);
      expect(convertListeningToBand(23)).toBe(6.0);
    });

    test('should convert 0-3 correct answers to 2.5 or lower', () => {
      expect(convertListeningToBand(3)).toBe(2.5);
      expect(convertListeningToBand(2)).toBe(2.5);
      expect(convertListeningToBand(1)).toBe(2.5);
      expect(convertListeningToBand(0)).toBe(2.5);
    });
  });

  describe('Academic Reading Band Conversion', () => {
    test('should convert 39-40 correct answers to 9.0', () => {
      expect(convertReadingToBand(40)).toBe(9.0);
      expect(convertReadingToBand(39)).toBe(9.0);
    });

    test('should convert 30-32 correct answers to 7.0', () => {
      expect(convertReadingToBand(32)).toBe(7.0);
      expect(convertReadingToBand(31)).toBe(7.0);
      expect(convertReadingToBand(30)).toBe(7.0);
    });

    test('should convert 23-26 correct answers to 6.0', () => {
      expect(convertReadingToBand(26)).toBe(6.0);
      expect(convertReadingToBand(25)).toBe(6.0);
      expect(convertReadingToBand(24)).toBe(6.0);
      expect(convertReadingToBand(23)).toBe(6.0);
    });

    test('should convert 0-5 correct answers to 2.5 or lower', () => {
      expect(convertReadingToBand(5)).toBe(2.5);
      expect(convertReadingToBand(0)).toBe(2.5);
    });
  });

  describe('General Training Reading Band Conversion', () => {
    test('should convert 40 correct answers to 9.0', () => {
      expect(convertReadingGeneralTrainingToBand(40)).toBe(9.0);
    });

    test('should convert 39 correct answers to 8.5', () => {
      expect(convertReadingGeneralTrainingToBand(39)).toBe(8.5);
    });

    test('should convert 34-35 correct answers to 7.0', () => {
      expect(convertReadingGeneralTrainingToBand(35)).toBe(7.0);
      expect(convertReadingGeneralTrainingToBand(34)).toBe(7.0);
    });

    test('should convert 30-31 correct answers to 6.0', () => {
      expect(convertReadingGeneralTrainingToBand(31)).toBe(6.0);
      expect(convertReadingGeneralTrainingToBand(30)).toBe(6.0);
    });

    test('should convert 0-8 correct answers to 2.5 or lower', () => {
      expect(convertReadingGeneralTrainingToBand(8)).toBe(2.5);
      expect(convertReadingGeneralTrainingToBand(0)).toBe(2.5);
    });
  });

  describe('Overall Band Calculation - Official IELTS Rounding Rules', () => {
    test('should round down when decimal is 0.00-0.24', () => {
      // Average: 6.00 → 6.0
      expect(calculateOverallBand(6.0, 6.0, 6.0, 6.0)).toBe(6.0);
      
      // Average: 6.125 → 6.0 (round down)
      expect(calculateOverallBand(6.5, 6.0, 6.0, 6.0)).toBe(6.0);
      
      // Average: 5.125 → 5.0 (round down)
      expect(calculateOverallBand(5.5, 5.0, 5.0, 5.0)).toBe(5.0);
    });

    test('should round to .5 when decimal is 0.25-0.74', () => {
      // Average: 6.25 → 6.5
      expect(calculateOverallBand(6.5, 6.5, 6.0, 6.0)).toBe(6.5);
      
      // Average: 6.50 → 6.5
      expect(calculateOverallBand(6.5, 6.5, 6.5, 6.5)).toBe(6.5);
      
      // Average: 6.625 → 6.5
      expect(calculateOverallBand(7.0, 6.5, 6.5, 6.5)).toBe(6.5);
    });

    test('should round up when decimal is 0.75-0.99', () => {
      // Average: 6.75 → 7.0 (round up)
      expect(calculateOverallBand(7.0, 7.0, 6.5, 6.5)).toBe(7.0);

      // Average: 6.875 → 7.0 (round up)
      expect(calculateOverallBand(7.0, 7.0, 7.0, 6.5)).toBe(7.0);
    });

    test('should handle real-world examples correctly', () => {
      // Example 1: L:6.5, R:6.5, W:5.0, S:7.0 → Average: 6.25 → 6.5
      expect(calculateOverallBand(6.5, 6.5, 5.0, 7.0)).toBe(6.5);

      // Example 2: L:8.0, R:7.0, W:6.5, S:6.5 → Average: 7.0 → 7.0
      expect(calculateOverallBand(8.0, 7.0, 6.5, 6.5)).toBe(7.0);

      // Example 3: L:4.0, R:5.0, W:4.0, S:4.0 → Average: 4.25 → 4.5
      expect(calculateOverallBand(4.0, 5.0, 4.0, 4.0)).toBe(4.5);

      // Example 4: L:6.5, R:6.5, W:5.5, S:6.5 → Average: 6.25 → 6.5
      expect(calculateOverallBand(6.5, 6.5, 5.5, 6.5)).toBe(6.5);
    });

    test('should ensure all results are valid band scores (.0 or .5)', () => {
      const testCases = [
        [6.0, 6.0, 6.0, 6.0],
        [6.5, 6.5, 6.5, 6.5],
        [7.0, 6.5, 6.0, 7.5],
        [8.0, 7.5, 7.0, 8.5],
        [5.0, 5.5, 5.0, 5.5],
      ];

      testCases.forEach(([l, r, w, s]) => {
        const result = calculateOverallBand(l, r, w, s);
        expect(isValidBandScore(result)).toBe(true);
      });
    });
  });

  describe('Band Score Validation', () => {
    test('should accept valid band scores', () => {
      expect(isValidBandScore(0.0)).toBe(true);
      expect(isValidBandScore(0.5)).toBe(true);
      expect(isValidBandScore(6.0)).toBe(true);
      expect(isValidBandScore(6.5)).toBe(true);
      expect(isValidBandScore(9.0)).toBe(true);
    });

    test('should reject invalid band scores', () => {
      expect(isValidBandScore(6.3)).toBe(false);
      expect(isValidBandScore(7.2)).toBe(false);
      expect(isValidBandScore(6.8)).toBe(false);
      expect(isValidBandScore(10.0)).toBe(false);
      expect(isValidBandScore(-1.0)).toBe(false);
    });
  });
});
