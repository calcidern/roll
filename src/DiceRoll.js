import React, {Component} from 'react';
import objectAssign from 'object-assign';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Chip, Button} from "material-ui";
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RollResult from './components/Roll.component';

import {updateInput, executeRoll, executeReroll} from './model3/rollActions';

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
    this.props.updateInput(value);
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
    this.setState(Object.assign({}, this.state, {history: rolls}));
    this.props.executeReroll(rollNr, diceNr);
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
    const {input, validRoll, currentRoll, results} = this.props;
    const diceChip = validRoll && (
      <Chip style={{marginRight: '1em'}}
            label={currentRoll.phrase}/>
    );

    return (
      <div className="main">

        <div className="dice-input-group">
          <TextField
            value={input}
            onChange={this.updateInput}
            onKeyDown={this.handleTextFieldKeyDown}
            style={{marginRight: '1em', width: '100%'}}/>

          <Button raised color="primary" onClick={this.updateRoll}>
            Roll
          </Button>
        </div>


        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {diceChip}
        </div>

        <List>
          {results.map((roll, i) => (
            <ListItem key={i}>
              <RollResult roll={roll} onReroll={(diceNr) => this.onReroll(diceNr, i)}/>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  input: state.roll.input,
  validRoll: state.roll.validRoll,
  currentRoll: state.roll.currentRoll,
  results: state.roll.results,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateInput,
  executeRoll,
  executeReroll
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceRoll);