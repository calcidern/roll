import {Dice} from "./Dice";
import parser, {isValidRoll} from "./rollNotationParser";

export class Roll {
  dices;
  rolled;
  mark;

  constructor(dices, rolled=false, mark='k') {
    this.dices = dices;
    this.rolled = rolled;
    this.mark=mark;
  }

  static fromNotation(notation) {
    const parsed = parser(notation);
    const number = parseInt(parsed.count) || 1;
    const diceSign = Math.sign(number);
    const numberAbs = Math.abs(number);
    const type = parseInt(parsed.type);

    const dices = (new Array(numberAbs)).fill(new Dice(type, diceSign));

    return new Roll(dices,false,parsed.mark);
  }

  static isRollNotation(notation) {
    return isValidRoll(notation);
  }

  roll() {
    this.dices.forEach(d => d.roll());
    this.rolled=true;
    return this;
  }
  clone(){
    return new Roll(this.dices.map(d=>d.clone()),this.rolled,this.mark);
  }

  get notation(){
    return `${this.dices.length}${this.mark}${this.dices[0].type}`;
  }

  get results (){
    return this.dices.map(d=>d.result);
  }

  get sum (){
    return this.results.reduce((sum,x)=>sum+x,0);
  }



}