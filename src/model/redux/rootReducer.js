import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import rollReducer from './rollReducer';

export default combineReducers({
  routing: routerReducer,
  roll:rollReducer
});