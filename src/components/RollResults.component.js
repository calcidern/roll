import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default ({results}) => {
    const resultStr = `Results: ${results.diceResults.map(e => e.join(',')).join('||')}`;
    const eachStr = `Each: ${results && results.sumEach.join('||')}`;
    const totalStr = `Total: ${results && results.sumAll}`;
  return (
    <div>
      <List>
        <ListItem primaryText={resultStr} />
        {results.sumEach.length > 1 && <ListItem primaryText={eachStr} />}
        <ListItem primaryText={totalStr} />
      </List>
    </div>
  )
}