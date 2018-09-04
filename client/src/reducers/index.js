import { combineReducers } from 'redux';
import search from './search';
import login from './login';
import sidebar from './sidebar';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  search,
  login,
  sidebar,
  routing: routerReducer
})
