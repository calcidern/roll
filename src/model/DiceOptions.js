export class DiceOptions {

  notation;

  explode = false;
  divide = false;
  reroll = false;

  constructor(notation) {
    this.notation=notation;
    this.explode = this.setExplode(notation);
    this.divide = this.setDivide(notation);
    this.reroll = this.matchReroll(notation);
  }

  toString() {
    return `${this.explode ? ' !' : ''}${this.divide ? ' /' + this.divide : ''}`;
  }

  setExplode(notation){
    return !!notation.match('!');
  }
  setDivide(notation){
    return (notation.match(/\/\d+/) || []).map(e => e.split('/')[1]).map(e => parseInt(e, 10))[0] || false;
  }
  matchReroll(notation){
    console.log(notation.match(/-r[\d+]/));
    return notation.match(/-r\d+/)
  }


}