/**
 * Created by calcidern on 25.11.2017.
 */
import {Roll} from "./Roll";

it('should extract dice when simple currentRoll', () => {
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

it('should return roll sum', () => {
  const roll = new Roll([new MockDice([1, 1, 1, 1])]);

  expect(roll.getResult().sumEach[0]).toEqual(4);
  expect(roll.getResult().sumAll).toEqual(4);
});

class MockDice {
  result;
  diceSign = 1;

  constructor(result, diceSign) {
    this.result = result;
    this.diceSign = diceSign || 1;
  }

  roll() {
    return this.result;
  }
}