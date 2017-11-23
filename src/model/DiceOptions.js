export class DiceOptions {

  notation;

  explode = false;
  divide = false;

  constructor(notation) {
    this.notation=notation;
    this.explode = this.setExplode(notation);
    this.divide = this.setDivide(notation);
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


}