import React, {Component} from 'react';
import objectAssign from 'object-assign';

import './App.css';
import {Roll} from "./model/Roll";
import {Dice} from "./model/Dice";
import {Chip, MuiThemeProvider, RaisedButton} from "material-ui";
import TextField from 'material-ui/TextField';
import RollResults from './components/RollResults.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
    this.updateRoll = this.updateRoll.bind(this);
    this.handleTextFieldKeyDown = this.handleTextFieldKeyDown.bind(this);
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
        roll: roll
      }
    ));
  }

  updateRoll() {
    if (this.state.roll) {
      this.setState(objectAssign({}, this.state, {result: this.state.roll.getResult()}));
    }
  }

  handleTextFieldKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        this.updateRoll();
        break;
      case 'Escape':
        this.setState(objectAssign({}, this.state, {input: ''}));
        break;
      default:
        break
    }
  }

  render() {
    let diceChips;
    if (this.state.roll) {
      diceChips = this.state.roll.dices.map((dice, i) => (
        <Chip key={dice + i}
              style={{marginRight: '1em'}}>
          {dice.toString()}
        </Chip>));
    }

    return (
      <MuiThemeProvider>
        <main className="main">
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {diceChips}
          </div>
          <div className="dice-input-group">
            <TextField hintText="Dice expression"
                       value={this.state.input}
                       onChange={this.updateInput}
                       onKeyDown={this.handleTextFieldKeyDown}
                       style={{marginRight: '1em', width: '100%'}}/>
            <RaisedButton label="Roll" primary={true} onClick={this.updateRoll}/>
          </div>
          {this.state.result && <RollResults results={this.state.result}/>}
        </main>
      </MuiThemeProvider>
    );
  }
}

export default App;
