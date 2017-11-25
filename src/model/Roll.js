/**
 * Created by calcidern on 15.11.2017.
 */
import {Dice} from "./Dice";

export class Roll{
  dices;
  options;
  log;

  constructor(dices, options){
    this.dices= dices;
    this.options = options;
  }

  static fromNotation(notation){
    const words = notation.split(' ');
    const diceIndexes = words.map(e=>Dice.isDiceNotation(e)).map((e,i)=>e && i ).filter(e=>e!==false);
    console.log(diceIndexes);
    const dices = words.filter((e)=>Dice.isDiceNotation(e)).map(e=>Dice.fromNotation(e));

    return new Roll(dices);
  }


}