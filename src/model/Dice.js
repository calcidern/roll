
export class Dice{

  number;
  type;

  options={
    explode:false,
    divide:false
  };

  constructor(notation,options) {
    const split = notation.split(/[dk]/);
    this.number = parseInt(split[0],10) || 1;
    this.type = parseInt(split[1], 10);
    const optionsCompacted = split[1].replace(this.type,'');
    this.applyOptions(optionsCompacted);
  }

  applyOptions(optionsString){
    this.options.explode = !!optionsString.match('!');
    this.options.divide = (optionsString.match(/\/\d+/) || []).map(e=>e.split('/')[1])[0] || false;
  }
}