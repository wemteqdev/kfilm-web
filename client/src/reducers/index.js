import { combineReducers } from 'redux';
import search from './search';
import login from './login';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  search,
  login,
  routing: routerReducer
})