import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import {Dice} from './Dice.component';
import {BigDice} from './BigDice.component';
import {ASCENDING, DESCENDING} from "../model/actions/sortActions";

export default ({roll, onReroll, rerollAll}) => {

  return (
    <ListItem>
      <ListItemIcon>
        <BigDice sum={roll.sum} rerolled={roll.rerolled} onReroll={rerollAll}/>
      </ListItemIcon>
      <div>
        {roll.phrase}
        <div>
          {roll.dices.map((d, i) => <Dice key={i} dice={d} onReroll={() => onReroll(i)}/>)}
        </div>
      </div>
    </ListItem>
  );
};

function sortDices(roll, direction) {
  switch (direction) {
    case ASCENDING:
      return roll.dices.sort((a, b) => a.value - b.value);
    case DESCENDING:
      return roll.dices.sort((a, b) => b.value - a.value);
    default:
      return roll.dices;
  }
}