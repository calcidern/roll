import {Dice} from "./Dice";

it('should parse simple "k" dice notation', () => {
  const dice = Dice.fromNotation('1k20');

  expect(dice.number).toBe(1);
  expect(dice.type).toBe(20);
});

it('should parse simple "d" dice notation', () => {
  const dice = Dice.fromNotation('1d20');

  expect(dice.number).toBe(1);
  expect(dice.type).toBe(20);
});

it('should parse short dice notation', () => {
  const dice = Dice.fromNotation('d20');

  expect(dice.number).toBe(1);
});

describe('with inline options',()=>{

  it('should parse when options present', () => {
    const dice = Dice.fromNotation('1d20!');

    expect(dice.number).toBe(1);
    expect(dice.type).toBe(20);
  });

  it('should extract options', () => {
    const dice = Dice.fromNotation('1d20!');

    expect(dice.options.explode).toEqual(true);
  });

  it('should extract divide option', () => {
    const dice = Dice.fromNotation('1d20/10');

    expect(dice.options.divide).toEqual(10);
  });

  it('should not extract options', () => {
    const dice = Dice.fromNotation('1d20');

    expect(dice.options.divide).toEqual(false);
    expect(dice.options.explode).toEqual(false);
  });

  it('should extract option multiple options', () => {
    const dice = Dice.fromNotation('1d20!/10');

    expect(dice.options.explode).toEqual(true);
    expect(dice.options.divide).toEqual(10);
  });
  describe('dice sign',()=>{
    it('should extract positive sign as default', () => {
      const dice = Dice.fromNotation('1d20');

      expect(dice.diceSign > 0).toBe(true);
    });

    it('should parse dice if positive sign present', () => {
      const dice = Dice.fromNotation('+1d20');

      expect(dice.number).toBe(1);
      expect(dice.type).toBe(20);
    });

    it('should extract positive sign if present', () => {
      const dice = Dice.fromNotation('+1d20');

      expect(dice.diceSign).toBe(1);
    });

    it('should parse dice if negative sign present', () => {
      const dice = Dice.fromNotation('-1d20');

      expect(dice.number).toBe(1);
      expect(dice.type).toBe(20);
    });

    it('should extract negative sign if present', () => {
      const dice = Dice.fromNotation('-1d20');

      expect(dice.diceSign).toBe(-1);
    });
  });



});

describe('isDiceNotation',()=>{

  it('should be valid when full notation', () => {
    expect(Dice.isDiceNotation('1k10')).toBe(true);
  });

  it('should be valid when no dice number present', () => {
    expect(Dice.isDiceNotation('k10')).toBe(true);
  });

  it('should be valid when options present', () => {
    expect(Dice.isDiceNotation('k10!/10')).toBe(true);
  });

  it('should be invalid when no dice present', () => {
    expect(Dice.isDiceNotation('1')).toBe(false);
  });

  it('should be invalid when no dice type present', () => {
    expect(Dice.isDiceNotation('1k')).toBe(false);
  });

  it('should be invalid when type is not a number', () => {
    expect(Dice.isDiceNotation('1kaaa')).toBe(false);
  });

});
