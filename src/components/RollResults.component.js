import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Chip, RaisedButton} from "material-ui";

export default ({results}) => {
  const resultStr = `Results: ${results.diceResults.map(e => e.join(',')).join('||')}`;
  const eachStr = `Each: ${results && results.sumEach.join('||')}`;
  const totalStr = `Total: ${results && results.sumAll}`;
  const resultItems = results.diceResults.map((em, i) => (
    <span key={i} style={{display: 'inline-flex', flexWrap: 'wrap',margin:'0 0.25em'}}>
      {em.map((e, j) => <RaisedButton key={10 * i + j}
                                      style={{minWidth:'36px', margin:'0 0.2em'}}
                                      overlayStyle={{padding:'0 0.5em'}}>
        {e}
        </RaisedButton>)}
    </span>
  ));
  return (
    <div>
      <List>
        <ListItem innerDivStyle={{paddingBottom:4,paddingTop:4}}>
          Results: {resultItems}
        </ListItem>
        {results.sumEach.length > 1 && <ListItem primaryText={eachStr}/>}
        <ListItem primaryText={totalStr}/>
      </List>
    </div>
  )
}