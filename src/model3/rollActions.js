
export const INPUT_UPDATE = 'INPUT_UPDATE';

export const updateInput = input => {
  return dispatch => {
    dispatch({
      type: INPUT_UPDATE,
      input
    });

  }
};