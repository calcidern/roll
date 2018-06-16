import {EXECUTE_REROLL, EXECUTE_ROLL, INPUT_UPDATE} from './rollActions'
import parse, {isValidRoll} from "./rollNotationParser";
import rollDice, {arrayReplace, reroll} from "./rollDice";

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
        }
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
    default:
      return state
  }
}