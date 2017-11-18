export class DiceOptions {

  explode = false;
  divide = false;

  constructor(notation) {
    this.explode = !!notation.match('!');
    this.divide = (notation.match(/\/\d+/) || []).map(e=>e.split('/')[1]).map(e=>parseInt(e,10))[0] || false;
  }
}