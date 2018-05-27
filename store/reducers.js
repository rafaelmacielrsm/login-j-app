import C from './constants';
import { combineReducers } from 'redux';

const user = ( state = {}, action ) => {
  switch ( action.type ) {
  case C.LOGIN:
    return action.payload;
  case C.LOGOUT:
    return {};
  default:
    return state;
  }
};

const isAuthenticated = ( state = false, action ) => {
  switch ( action.type ) {
  case C.LOGIN:
    return true;
  case C.LOGOUT:
    return false;
  default:
    return state;
  }
};


const reducer = combineReducers({
  auth: combineReducers({
    user, isAuthenticated
  })
});

export default reducer;