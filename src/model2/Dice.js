import randomRoll from './randomRoll'

export class Dice {
  type;
  sign = 1;

  _value;

  state = {
    rerolled: false
  };

  constructor(type, sign) {
    this.type = type;
    this.diceSign = sign || 1;
  }

  get result() {
    return this._value * this.sign;
  }

  roll() {
    this._value = randomRoll(this.type);
    return this.result;
  }

  reroll() {
    this.roll();
    this.state.rerolled = true;
    return this.clone();
  }

  clone() {
    const newDice = new Dice(this.type, this.sign);
    newDice._value = this._value;
    newDice.state = Object.assign({}, this.state);
    return newDice;
  }

}