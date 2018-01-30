import {Dice} from "./Dice";

export class Roll {
  dices;
  rolled;

  constructor(dices, rolled=false) {
    this.dices = dices;
    this.rolled = rolled;
  }

  static fromNotation(notation) {

    const split = notation.split(/[dkDK]/);
    const number = parseInt(split[0], 10) || 1;
    const diceSign = Math.sign(number);
    const numberAbs = Math.abs(number);
    const type = parseInt(split[1], 10);

    const dices = (new Array(numberAbs)).fill(new Dice(type, diceSign));

    return new Roll(dices);
  }

  static isRollNotation(notation) {
    const split = notation.split(/[dkDK]/);
    return !!parseInt(split[1], 10);
  }

  roll() {
    this.dices.forEach(d => d.roll());
    this.rolled=true;
    return this;
  }
  clone(){
    return new Roll(this.dices.map(d=>d.clone()),this.rolled);
  }

  get notation(){
    return `${this.dices.length}k${this.dices[0].type}`;
  }

  get results (){
    return this.dices.map(d=>d.result);
  }

  get sum (){
    return this.results.reduce((sum,x)=>sum+x,0);
  }



}