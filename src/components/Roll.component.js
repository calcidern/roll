import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import {Dice} from './Dice.component';
import SortButton from './SortButton.component';
import {BigDice} from './BigDice.component';
import {ASCENDING, DESCENDING} from '../model/actions/sortActions';

export default ({roll, onReroll, rerollAll, onSort}) => {

  const {dices, sortDirection} = roll;
  const sortedDices = sortDices([...dices], sortDirection);

  return (
    <ListItem>
      <ListItemIcon>
        <BigDice sum={roll.sum} rerolled={roll.rerolled} onReroll={rerollAll}/>
      </ListItemIcon>
      <div>
        {roll.phrase}
        <div>
          {sortedDices.map((d, i) => <Dice key={i} dice={d} onReroll={() => onReroll(i)}/>)}
        </div>
      </div>
      <ListItemSecondaryAction>
        <SortButton direction={sortDirection} onSort={onSort}/>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

function sortDices(dices, sortDirection) {
  switch (sortDirection) {
    case ASCENDING:
      return dices.sort((a, b) => a.value - b.value);
    case DESCENDING:
      return dices.sort((a, b) => b.value - a.value);
    default:
      return dices;
  }
}