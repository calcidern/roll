import React, {Component} from 'react';
import objectAssign from 'object-assign';

import './App.css';
import {Roll} from "./model/Roll";
import {Dice} from "./model/Dice";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
    this.state = {
      input: '',
      roll: null,
      dice: null
    };
  }

  updateInput(e) {
    const value = e.target.value;
    const dice = Dice.isDiceNotation(value) && Dice.fromNotation(value);
    this.setState(objectAssign({}, this.state,
      {
        input: value,
        roll: new Roll(value),
        dice: dice
      }
    ));
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.input} onChange={this.updateInput}/>
        {/*<div>{this.state.roll ? this.state.roll.isDiceString(this.state.input).join('|') :''}</div>*/}
        <div>{this.state.dice && this.state.dice.toString()}</div>
        <div>{this.state.dice && this.state.dice.roll().toString()}</div>
      </div>
    );
  }
}

export default App;
