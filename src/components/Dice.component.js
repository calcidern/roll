import React from 'react';
import {Button} from "material-ui";

export const Dice = ({dice, onReroll}) => {

  const styles={
    minWidth: 0,
    margin: '0.2em',
    background: dice.state.rerolled && 'lightgreen'
  };

  return (
    <div>
      <Button raised onClick={()=>onReroll()}
        // style={{minWidth:'36px', margin:'0 0.2em'}}
        // overlaystyle={{padding:'0 0.5em'}}
              style={styles}>
        {dice.result}
      </Button>
    </div>
  )
};