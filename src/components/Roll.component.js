import React from 'react';
import {Dice} from './Dice.component';

export default ({roll, onReroll}) => {
  return (
    <div>
      {roll.phrase}: {roll.sum}
      <div>
        {roll.dices.map((d, i) => <Dice key={i} dice={d} onReroll={() => onReroll(i)}/>)}
      </div>
    </div>
  );
};