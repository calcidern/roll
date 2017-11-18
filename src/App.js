import React, {Component} from 'react';
import objectAssign from 'object-assign';

import './App.css';
import {Roll} from "./model/Roll";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
    this.state = {
      input: '',
      roll: null
    };
  }

  updateInput(e){
    this.setState(objectAssign({}, this.state, {input: e.target.value,roll:new Roll(e.target.value)}));
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.input} onChange={this.updateInput}/>
        <div>{this.state.roll ? this.state.roll.isDiceString(this.state.input).join('|') :''}</div>
      </div>
    );
  }
}

export default App;
