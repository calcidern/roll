import React, {Component} from 'react';
import { Route } from 'react-router-dom'

import DiceRoll from "./DiceRoll";

class App extends Component {

  render() {
    return (
      <main>
        <Route  exact path="/" component={DiceRoll} />

      </main>
    );
  }
}

export default App;
