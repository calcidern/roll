import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {executeReroll, executeRerollAll} from '../model/actions/rollActions';
import {sortDices} from '../model/actions/sortActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Roll from './Roll.component';

export function RollList({results, onReroll, rerollAll, sortDices}) {

  return (
    <List>
      {results.map((roll, index) => (
        <React.Fragment key={index}>
          {!!index && <Divider/>}
          <Roll roll={roll}
                onReroll={(diceNr) => onReroll(index, diceNr)}
                onSort={(direction) => sortDices(index, direction)}
                rerollAll={() => rerollAll(index)}/>
        </React.Fragment>
      ))}
    </List>
  );
}

const mapStateToProps = state => ({
  results: state.roll.results,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onReroll: executeReroll,
  rerollAll: executeRerollAll,
  sortDices
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RollList);