import parser, {isValidRoll} from "./rollNotationParser";

describe('Roll notation Parser', () => {
  describe('validity check', () => {
    it('should be valid when full notation', () => {
      expect(isValidRoll('1k10')).toBe(true);
    });

    it('should be valid when no dice number present', () => {
      expect(isValidRoll('k10')).toBe(true);
    });

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
  describe('parsing', () => {
    it('should parse full notation', () => {
      const parsed = parser('1k10');
      expect(parsed.count).toBe('1');
      expect(parsed.mark).toBe('k');
      expect(parsed.type).toBe('10');
      expect(parsed.modifier).toBeUndefined();
    });
    it('should be invalid when type is not a number', () => {
      const parsed = parser('k10');
      expect(parsed.count).toBe(undefined);
      expect(parsed.mark).toBe('k');
      expect(parsed.type).toBe('10');
      expect(parsed.modifier).toBeUndefined();
    });
  });
});
