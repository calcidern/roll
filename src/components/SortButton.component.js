/**
 * Created by calcidern on 15.07.2018.
 */
import React from 'react';

import Descending from '@material-ui/icons/TrendingDown';
import Ascending from '@material-ui/icons/TrendingUp';
import Shuffle from '@material-ui/icons/Shuffle';
import IconButton from '@material-ui/core/IconButton';

import {ASCENDING, DESCENDING, NONE} from "../model/actions/sortActions";


export default ({direction, onSort}) => {

  switch (direction) {
    case  ASCENDING:
      return (
        <IconButton onClick={() => onSort(NONE)}>
          <Shuffle/>
        </IconButton>
      );
    case DESCENDING:
      return (
        <IconButton onClick={() => onSort(ASCENDING)}>
          <Ascending/>
        </IconButton>
      );
    default:
      return (
        <IconButton onClick={() => onSort(DESCENDING)}>
          <Descending/>
        </IconButton>
    );
  }
}