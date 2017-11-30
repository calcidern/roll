import {DiceOptions} from "./DiceOptions";

export class Dice {

  random = Math.random;

  number;
  type;

  diceSign = 1;
  options;

  constructor(number, type, options, diceSign) {
    this.number = number;
    this.type = type;
    this.options = options;
    this.diceSign = diceSign || 1;
  }

  toString() {
    return `${this.number}k${this.type}${this.options.toString()}`;
  }

  static isDiceNotation(notation) {
    const split = notation.split(/[dk]/);
    return !!parseInt(split[1], 10);
  }

  static fromNotation(notation) {
    const split = notation.split(/[dk]/);
    const number = parseInt(split[0], 10) || 1;
    const diceSign = Math.sign(number);
    const numberAbs = Math.abs(number);
    const type = parseInt(split[1], 10);
    const optionsCompacted = split[1].replace(type, '');
    const options = new DiceOptions(optionsCompacted);

    return new Dice(numberAbs, type, options, diceSign);
  }

  getSingle() {
    return new Dice(1, this.type, this.options);
  }

  roll() {
    let result = (new Array(this.number))
      .fill(0)
      .map(e => this.random())
      .map(e => (e * this.type))
      .map(e => Math.ceil(e) || 1);
    if(this.options) {
      switch (true) {
        case this.options.explode:
          result = result
            .map(e => e === this.type ? [e, this.getSingle().roll()] : e)
            .reduce((a,b)=> [...a,...b]);
          console.log(result);
      }
    }

    return result;
  }


}