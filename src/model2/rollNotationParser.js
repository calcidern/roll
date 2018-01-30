import {Roll} from "./Roll";

export default (notation) =>{
  const words = notation.split(' ').filter(e => e);
  const diceIndexes = words.map(e => Roll.isRollNotation(e)).map((e, i) => e && i).filter(e => e !== false);
  const beginning = words.slice(0, diceIndexes[0]);
  const diceScope = [beginning, ...diceIndexes.map((e, i) => words.slice(e, diceIndexes[i + 1]))];
  diceScope.filter(e=>e.length).forEach((e, i) => {
    const last = e.pop();
    if (last === '-' || last === '+') {
      diceScope[i + 1].unshift(last)
    } else {
      e.push(last)
    }
  });
  return diceScope.filter(e => e.length).map(e => e.join(''));
}