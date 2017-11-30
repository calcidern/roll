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
    const roll = Roll.fromNotation(value);
    this.setState(objectAssign({}, this.state,
      {
        input: value,
        roll: roll,
        result: roll.getResult()
      }
    ));
  }

  render() {
    return (
      <div className="App">
        <main className="main">

          <input type="text" value={this.state.input} onChange={this.updateInput}/>
          {/*<div>{this.state.roll ? this.state.roll.isDiceString(this.state.input).join('|') :''}</div>*/}
          <div>Results: {this.state.result && this.state.result.diceResults.map(e => e.join(',')).join('||')}</div>
          {this.state.result &&
          this.state.result.sumEach.length > 1 &&
          <div>Each: {this.state.result && this.state.result.sumEach.join('||')}</div>}
          <div>Total: {this.state.result && this.state.result.sumAll}</div>
          {/*<div>{this.state.dice && this.state.dice.roll().toString()}</div>*/}
        </main>
      </div>
    );
  }
}

export default App;
