import C from './constants';
import { combineReducers } from 'redux';

const userData = ( state = {}, action ) => {
  switch (action.type) {
  case C.ADD_USER_INFO:
    return action.payload;
  case C.LOGOUT:
  case C.REMOVE_USER_INFO:
    return {};
  default:
    return state;
  }
};

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
  fetching,
  userData
});

export default reducer;