import C from './constants';
import { combineReducers } from 'redux';

const auth = ( state = {}, action ) => {
  switch ( action.type ) {
  case C.LOGIN:
    return action.payload;
  case C.LOGOUT: 
    return {};
  default:
    return state;
  }
};

const alerts = ( state = [], action ) => {
  switch ( action.type ) {
  case C.ADD_ALERT:
    return [action.payload, ...state];
  case C.CLEAR_ALERT:
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
  auth, 
  alerts,
  fetching
});

export default reducer;