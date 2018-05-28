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

const errors = ( state = [], action ) => {
  switch ( action.type ) {
  case C.ADD_ERROR:
    return [action.payload, ...state];
  case C.CLEAR_ERROR:
    return state.filter((value, index) => index !== action.payload);
  default:
    return state;
  }
};

const fetching = ( state = false, action ) => {
  switch ( action.type ) {
  case C.FETCHING:
    return true;
  case C.CANCEL_FETCHING:
    return false;
  default:
    return state;
  }
};


const reducer = combineReducers({
  auth: combineReducers({
    user, isAuthenticated
  }),
  errors,
  fetching
});

export default reducer;