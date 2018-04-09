import {Dice} from "../model2/Dice";
import randomRoll from "../model2/randomRoll";

export default (roll) => {
  const {count, type, modifier} = roll;
  const dices = (new Array(count))
    .fill(0)
    .map(() => randomRoll(type))
    .map(value => ({value}));

  const sum = dices.reduce((sum, x) => sum + x.value, modifier || 0);
  return {...roll, dices, sum};
}


export function reroll(roll, index) {
  const {dices, type, modifier} = roll;
  const oldDice = dices[index];
  const newDices = arrayReplace(dices, index, {...oldDice, value: randomRoll(type), rerolled: true});

  const sum = newDices.reduce((sum, x) => sum + x.value, modifier || 0);

  return {
    ...roll,
    dices: newDices,
    sum
  }
}

export function arrayReplace(arr, index, value) {
  return Object.assign(
    [],
    arr,
    {[index]: value});
}