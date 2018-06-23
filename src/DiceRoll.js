import React, {Component} from 'react';
import objectAssign from 'object-assign';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import RollResult from './components/Roll.component';

import {updateInput, executeRoll, executeReroll} from './model/rollActions';

import './App.css';

class DiceRoll extends Component {

  updateInput = (e) => {
    const {value} = e.target;
    this.props.updateInput(value);
  };

  updateRoll = () => {
    this.props.executeRoll(this.props.currentRoll);
  };

  onReroll = (diceNr, rollNr) => {
    this.props.executeReroll(rollNr, diceNr);
  };

  handleTextFieldKeyDown = (event) => {
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
  };

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

          <Button variant="contained" color="primary" onClick={this.updateRoll}>
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