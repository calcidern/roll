import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Chip, Button} from "material-ui";
import {Dice} from "./Dice.component";

export default ({roll, onReroll}) => {
  return (
    <div>
      {roll.phrase}: {roll.sum}
      <div>
        {roll.dices.map((d, i) => <Dice key={i} dice={d} onReroll={() => onReroll(i)}/>)}
      </div>
    </div>
  );
}