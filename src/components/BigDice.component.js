import React from 'react';
import Button from '@material-ui/core/Button';

export const BigDice = ({sum,rerolled, onReroll}) => {

  const styles = {
    minWidth: '5em',
    padding:'1.5em',
    margin: '0.2em',
    background: rerolled && 'lightgreen'
  };

  return (
    <div style={{alignSelf: 'start'}}>
      <Button size={'large'} variant="contained" onClick={() => onReroll()}
        style={styles}>
        {sum}
      </Button>
    </div>
  );
};