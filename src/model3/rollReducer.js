import {INPUT_UPDATE} from './rollActions'

const initialState = {
    input: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_UPDATE:
      console.log(action);
      return {
        ...state,
        input: action.input
      };

    default:
      return state
  }
}