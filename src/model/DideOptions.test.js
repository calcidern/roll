import {DiceOptions} from "./DiceOptions";

it('should extract options', () => {
  const options = new DiceOptions('!');

  expect(options.explode).toEqual(true);
});

it('should extract divide option', () => {
  const options = new DiceOptions('/10');

  expect(options.divide).toEqual(10);
});

it('should extract option multiple options', () => {
  const options = new DiceOptions('!/10');

  expect(options.explode).toEqual(true);
  expect(options.divide).toEqual(10);
});