import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import search from './search';
import login from './login';
import sidebar from './sidebar';
import billLoading from './billLoading';

export default combineReducers({
  search,
  login,
  sidebar,
  billLoading,
  routing: routerReducer,
  form: formReducer
})
