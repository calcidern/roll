/**
 * Created by calcidern on 15.11.2017.
 */

export class Roll{
  expression;
  log;

  constructor(expression){
    this.expression=expression;
  }

  parseExpression(exp){
    const words = exp.split(' ');
    return words;
  }

  isDiceString(str){
    const split = str.split(/[dk]/);
    return split;
  }


}