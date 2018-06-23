import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import {Dice} from './Dice.component';
import {BigDice} from './BigDice.component';

export default ({roll, onReroll,rerollAll}) => {
  return (
    <ListItem>
      <ListItemIcon>
        <BigDice sum={roll.sum} rerolled={roll.rerolled} onReroll={rerollAll} />
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