import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import {executeRoll, updateInput} from './model/actions/rollActions';

import './App.css';
import RollList from './components/RollResults.component';

class DiceRoll extends Component {

  updateInput = e => {
    const {value} = e.target;
    this.props.updateInput(value);
  };

  executeRoll = () => {
    this.props.executeRoll(this.props.currentRoll);
  };


  handleTextFieldKeyDown = (event) => {
    switch (event.key) {
    case 'Enter':
      this.executeRoll();
      break;
    case 'Escape':
      this.props.updateInput('');
      break;
    default:
      break;
    }
  };

  render() {
    const {input, validRoll, currentRoll} = this.props;
    const diceChip = validRoll && (
      <Chip label={currentRoll.phrase}/>
    );

    return (
      <div className="main">

        <div className="dice-input-group">
          <TextField
            value={input}
            onChange={this.updateInput}
            onKeyDown={this.handleTextFieldKeyDown}
            style={{marginRight: '1em', width: '100%'}}/>

          <Button variant="contained" color="primary" onClick={this.executeRoll}>
            Roll
          </Button>
        </div>


        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {diceChip}
        </div>

        <RollList/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  input: state.roll.input,
  validRoll: state.roll.validRoll,
  currentRoll: state.roll.currentRoll
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateInput,
  executeRoll
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceRoll);