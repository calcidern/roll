/**
 * Created by calcidern on 15.11.2017.
 */
import {Dice} from "./Dice";

export class Roll {
  dices;
  options;
  log;

  constructor(dices, options) {
    this.dices = dices;
    this.options = options;
  }

  static fromNotation(notation) {

    function normalizeDiceExpressions(notation) {
      const words = notation.split(' ').filter(e => e);
      const diceIndexes = words.map(e => Dice.isDiceNotation(e)).map((e, i) => e && i).filter(e => e !== false);
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

    const dices = normalizeDiceExpressions(notation).filter((e) => Dice.isDiceNotation(e)).map(e => Dice.fromNotation(e));

    return new Roll(dices);
  }

  getResult(){
    const diceResults = this.dices.map(d=>d.roll());
    const sumEach = diceResults.map((e,i)=>e.reduce((a,b)=>a+b,0)*this.dices[i].diceSign);
    const sumAll = sumEach.reduce((a,b)=>a+b,0);

    return {diceResults,sumEach,sumAll};
  }


}