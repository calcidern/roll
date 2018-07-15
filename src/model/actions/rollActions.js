
export const INPUT_UPDATE = 'INPUT_UPDATE';
export const EXECUTE_ROLL = 'EXECUTE_ROLL';
export const EXECUTE_REROLL = 'EXECUTE_REROLL';
export const EXECUTE_REROLL_ALL = 'EXECUTE_REROLL_ALL';

export const updateInput = input => {
  return dispatch => {
    dispatch({
      type: INPUT_UPDATE,
      input
    });


  };
};

export const executeRoll = roll => {
  return dispatch => {
    dispatch({
      type: EXECUTE_ROLL,
      roll
    });

  };
};

export const executeReroll = (rollNumber, index) => {
  return dispatch => {
    dispatch({
      type: EXECUTE_REROLL,
      rollNumber,
      index
    });

  };
};
export const executeRerollAll = (rollNumber) => {
  return dispatch => {
    dispatch({
      type: EXECUTE_REROLL_ALL,
      rollNumber
    });
  };
};

