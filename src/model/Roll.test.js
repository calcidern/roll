/**
 * Created by calcidern on 25.11.2017.
 */
import {Roll} from "./Roll";

it('should extract dice when simple notation', () => {
  const roll = Roll.fromNotation('1k20');

  expect(roll.dices[0].number).toBe(1);
  expect(roll.dices[0].type).toBe(20);
});

it('should extract multiple dices when present', () => {
  const roll = Roll.fromNotation('1k20 2d10');

  expect(roll.dices.length).toEqual(2);

  expect(roll.dices[0].number).toBe(1);
  expect(roll.dices[0].type).toBe(20);

  expect(roll.dices[1].number).toBe(2);
  expect(roll.dices[1].type).toBe(10);
});

it('should detect dice sign', () => {
  const roll = Roll.fromNotation(' - 2k20 + 3d10 ');

  expect(roll.dices.length).toEqual(2);

  expect(roll.dices[0].diceSign).toBe(-1);
  expect(roll.dices[1].diceSign).toBe(1);
});

it('should detect dice options', () => {
  const roll = Roll.fromNotation(' 2k20 ! 3d10 /10');

  expect(roll.dices.length).toEqual(2);

  expect(roll.dices[0].options.explode).toBe(true);
  expect(roll.dices[1].options.divide).toBe(10);
});