import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {executeReroll, executeRerollAll} from '../model/actions/rollActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Roll from './Roll.component';

export function RollList({results, onReroll, rerollAll}) {

  return (
    <List>
      {results.map((roll, index) => (
        <React.Fragment key={index}>
          {!!index && <Divider/>}
          <Roll roll={roll}
                onReroll={(diceNr) => onReroll(index, diceNr)}
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
  rerollAll: executeRerollAll
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RollList);