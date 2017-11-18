import {DiceOptions} from "./DiceOptions";

it('should extract options', () => {
  const dice = new DiceOptions('!');

  expect(dice.options.explode).toEqual(true);
});

it('should extract divide option', () => {
  const dice = new DiceOptions('/10');

  expect(dice.options.divide).toEqual(10);
});

it('should extract option multiple options', () => {
  const dice = new DiceOptions('!/10');

  expect(dice.options.explode).toEqual(true);
  expect(dice.options.divide).toEqual(10);
});