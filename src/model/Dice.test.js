import {Dice} from "./Dice";

it('should parse simple "k" dice notation', () => {
  const dice = new Dice('1k20');

  expect(dice.number).toBe(1);
  expect(dice.type).toBe(20);
});

it('should parse simple "d" dice notation', () => {
  const dice = new Dice('1d20');

  expect(dice.number).toBe(1);
  expect(dice.type).toBe(20);
});

it('should parse short dice notation', () => {
  const dice = new Dice('d20');

  expect(dice.number).toBe(1);
});
describe('with inline options',()=>{

  it('should parse when options present', () => {
    const dice = new Dice('1d20!');

    expect(dice.number).toBe(1);
    expect(dice.type).toBe(20);
  });

  it('should extract options', () => {
    const dice = new Dice('1d20!');

    expect(dice.options.explode).toEqual(true);
  });

  it('should extract divide option', () => {
    const dice = new Dice('1d20/10');

    expect(dice.options.divide).toEqual('10');
  });

  it('should not extract divide option', () => {
    const dice = new Dice('1d20');

    expect(dice.options.divide).toEqual(false);
  });

  it('should extract option multiple options', () => {
    const dice = new Dice('1d20!/10');

    expect(dice.options.explode).toEqual(true);
    expect(dice.options.divide).toEqual(10);
  });

});
