import {Dice} from "./Dice";
import {DiceOptions} from "./DiceOptions";

it('should parse simple "k" dice currentRoll', () => {
  const dice = Dice.fromNotation('1k20');

  expect(dice.number).toBe(1);
  expect(dice.type).toBe(20);
});

it('should parse simple "d" dice currentRoll', () => {
  const dice = Dice.fromNotation('1d20');

  expect(dice.number).toBe(1);
  expect(dice.type).toBe(20);
});

it('should parse short dice currentRoll', () => {
  const dice = Dice.fromNotation('d20');

  expect(dice.number).toBe(1);
});

describe('with inline options', () => {

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
  describe('dice sign', () => {
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

describe('isDiceNotation', () => {

  it('should be valid when full currentRoll', () => {
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

describe('dice roll result', () => {
  it('should return predefined number of results', () => {
    const dice = new Dice(2, 10);
    expect(dice.roll().length).toEqual(2);
  });

  it('should return array for single result', () => {
    const dice = new Dice(1, 10);
    expect(dice.roll().length).toEqual(1);
  });

  it('should not return 0 value', () => {
    const dice = new Dice(1, 10);
    dice.random = () => 0;
    expect(dice.roll()[0]).toEqual(1);
  });

  describe('explode', () => {
    it('should explode dice then highest roll', () => {
      const dice = new Dice(1, 10,new DiceOptions('!'));
      dice.random = () => 1;
      const result = dice.roll();
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result[1]).toBeGreaterThan(0);

    });

    it('should not explode then lower value', () => {
      const dice = new Dice(1, 10,new DiceOptions('!'));
      dice.random = () => 0;
      expect(dice.roll().length).toEqual(1);

    });
  });

});
describe('flatten', function () {
  it('should flatten simple array', function () {
    const arr= [1];
    const em = 2;
    expect(Dice.flatten(arr,em)).toEqual([1,2]);
  });

  it('should flatten complex array', function () {
    const arr= [1];
    const em = [2];
    expect(Dice.flatten(arr,em)).toEqual([1,2]);
  });

});

