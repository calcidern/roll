import parser, {isValidRoll} from './notationParser';

describe('Roll currentRoll Parser', () => {

  describe('validity check', () => {
    describe('valid input', () => {

      it('should be valid when full currentRoll', () => {
        expect(isValidRoll('1k10')).toBe(true);
      });

      it('should be valid when no dice number present', () => {
        expect(isValidRoll('k10')).toBe(true);
      });

      it('should be valid when given type is percent character', () => {
        expect(isValidRoll('1k%')).toBe(true);
      });

      it('should be valid when given modifier', () => {
        expect(isValidRoll('1k% + 10')).toBe(true);
      });
    });

    describe('invalid input', () => {

      it('should be invalid when no dice present', () => {
        expect(isValidRoll('1')).toBe(false);
      });

      it('should be invalid when no dice type present', () => {
        expect(isValidRoll('1k')).toBe(false);
      });

      it('should be invalid when type is not a number', () => {
        expect(isValidRoll('1kaaa')).toBe(false);
      });
    });
  });

  describe('parsing', () => {

    it('should parse full roll notation', () => {
      const parsed = parser('1k10 + 42');
      expect(parsed.count).toBe(1);
      expect(parsed.mark).toBe('k');
      expect(parsed.type).toBe(10);
      expect(parsed.modifier).toBe(42);
    });

    it('should have count one if not provided', () => {
      const parsed = parser('k10');
      expect(parsed.count).toBe(1);
      expect(parsed.mark).toBe('k');
      expect(parsed.type).toBe(10);
      expect(parsed.modifier).toBeUndefined();
    });

    it('should parse percent character to type 100', () => {
      const parsed = parser('k%');
      expect(parsed.type).toBe(100);
    });

  });
});
