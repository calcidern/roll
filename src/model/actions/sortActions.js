/**
 * Created by calcidern on 14.07.2018.
 */

export const SORT_DICES = 'SORT_DICES';

export const ASCENDING = 'ASCENDING';
export const DESCENDING = 'DESCENDING';
export const NONE = 'NONE';


export function sortDices(rollNumber, direction) {
  return dispatch => {
    dispatch({
      type: SORT_DICES,
      rollNumber,
      direction
    });
  };
}