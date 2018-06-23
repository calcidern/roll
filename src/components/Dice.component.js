import React from 'react';
import Button from '@material-ui/core/Button';

export const Dice = ({dice, onReroll}) => {

  const styles={
    minWidth: 0,
    margin: '0.2em',
    background: dice.rerolled && 'lightgreen'
  };

  return (
    <div style={{display:'inline-block'}}>
      <Button variant="contained" onClick={()=>onReroll()}
        style={styles}>
        {dice.value}
      </Button>
    </div>
  );
};