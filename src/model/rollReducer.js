import {EXECUTE_REROLL, EXECUTE_ROLL, EXECUTE_REROLL_ALL, INPUT_UPDATE} from './rollActions';
import parse, {isValidRoll} from './rollNotationParser';
import rollDice, {arrayReplace, reroll, rerollAll} from './rollDice';

const initialState = {
  input: '',
  validRoll: false,
  currentRoll: {},
  results: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  case INPUT_UPDATE:
    const {input} = action;
    const validRoll = isValidRoll(input);
    const currentRoll = validRoll ? parse(input) : {};
    return {
      ...state,
      input,
      validRoll,
      currentRoll
    };

  case EXECUTE_ROLL:
    if (state.validRoll) {
      const result = rollDice(action.roll);
      return {
        ...state,
        results: [result, ...state.results]
      };
    } else {
      return state;
    }
  case EXECUTE_REROLL:
    const {rollNumber, index} = action;
    const roll = state.results[rollNumber];
    const results = arrayReplace(state.results, rollNumber, reroll(roll, index));

    return {
      ...state,
      results
    };
  case EXECUTE_REROLL_ALL:
    const roll_all = state.results[action.rollNumber];
    const results_all = arrayReplace(state.results, action.rollNumber, rerollAll(roll_all));

    console.log(results_all[action.rollNumber].dices.map(({value})=>value));
    return {
      ...state,
      results: results_all
    };
  default:
    return state;
  }
};