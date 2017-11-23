import {DiceOptions} from "./DiceOptions";

export class Dice {

  number;
  type;

  options;

  constructor(number, type, options) {
    this.number = number;
    this.type = type;
    this.options = options;
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
    const type = parseInt(split[1], 10);
    const optionsCompacted = split[1].replace(type, '');
    const options = new DiceOptions(optionsCompacted);

    return new Dice(number, type, options);
  }

  getSingle() {
    return new Dice(1, this.type, this.options);
  }

  roll() {
    return (new Array(this.number))
      .fill(0)
      .map(e => Math.random())
      .map(e => (e * this.type))
      .map(e => Math.ceil(e) || 1);
  }


}