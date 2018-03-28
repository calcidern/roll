import React, {Component} from 'react';
import objectAssign from 'object-assign';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Chip, Button} from "material-ui";
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import {Roll} from "./model2/Roll";
import RollResult from './components/Roll.component';

import {updateInput,executeRoll} from './model3/rollActions';

import './App.css';

class DiceRoll extends Component {
  constructor(props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
    this.updateRoll = this.updateRoll.bind(this);
    this.onReroll = this.onReroll.bind(this);
    this.handleTextFieldKeyDown = this.handleTextFieldKeyDown.bind(this);
    this.state = {
      input: '',
      history: [],
      roll: null,
      dice: null
    };
  }

  updateInput(e) {
    const value = e.target.value;
    const roll = Roll.isRollNotation(value) && Roll.fromNotation(value);
    this.props.updateInput(value);
    this.setState(objectAssign({}, this.state,
      {
        input: value,
        roll: roll
      }
    ));
  }

  updateRoll() {
    this.props.executeRoll(this.props.currentRoll);
    if (this.state.roll) {
      const rolled = this.state.roll.clone().roll();
      this.setState(objectAssign({}, this.state, {
        history: [rolled, ...this.state.history]
      }));
    }
  }

  onReroll(diceNr, rollNr) {
    const rolls = this.state.history.map(r => r.clone());
    rolls[rollNr].dices[diceNr].reroll();
    console.log(rolls);
    this.setState(Object.assign({}, this.state, {history: rolls}))
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
    let diceChip;
    let rollResult;
    if (this.state.roll) {
      diceChip = (
        <Chip style={{marginRight: '1em'}}
              label={this.state.roll.notation}/>);
      rollResult = <RollResult roll={this.state.roll}/>
    }

    return (
      <div className="main">

        <div className="dice-input-group">
          <TextField
            value={this.state.input}
            onChange={this.updateInput}
            onKeyDown={this.handleTextFieldKeyDown}
            style={{marginRight: '1em', width: '100%'}}/>
          <Button raised color="primary" onClick={this.updateRoll}>
            Roll
          </Button>
        </div>

        <div>
          {this.props.input}
        </div>
        <div>
          {this.props.validRoll}
        </div>
        <div>
          {this.props.currentRoll.phrase}
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {diceChip}
        </div>
        <List>
          {this.state.history.map((roll, i) => (
            <ListItem button key={i}>
              <RollResult roll={roll} onReroll={(diceNr) => this.onReroll(diceNr, i)}/>
            </ListItem>
          ))}
        </List>
        {rollResult}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  input: state.roll.input,
  validRoll: state.roll.validRoll,
  currentRoll: state.roll.currentRoll,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateInput,
  executeRoll
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceRoll);