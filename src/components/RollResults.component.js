import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {executeReroll} from '../model/rollActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Roll from './Roll.component';

export function RollResults({results, onReroll}){

  return (
    <List>
      {results.map((roll, index) => (
        <ListItem key={index}>
          <Roll roll={roll} onReroll={(diceNr) => onReroll(index, diceNr)}/>
        </ListItem>


      ))}
    </List>
  );
}

const mapStateToProps = state => ({
  results: state.roll.results,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onReroll: executeReroll
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RollResults);