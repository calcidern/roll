
import {DiceOptions} from "./DiceOptions";

export class Dice{

  number;
  type;

  options;

  constructor(notation,options) {
    const split = notation.split(/[dk]/);
    this.number = parseInt(split[0],10) || 1;
    this.type = parseInt(split[1], 10);
    const optionsCompacted = split[1].replace(this.type,'');
    this.options = new DiceOptions(optionsCompacted);
  }

  toString(){
    return `${this.number}k${this.type}${this.options.toString()}`;
  }

  static isDiceNotation(notation){
    const split = notation.split(/[dk]/);
    return !!parseInt(split[1],10);
  }

}