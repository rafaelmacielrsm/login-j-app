import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
  user: {
    name: false
  }
};

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

const name = ( state = false, action ) => {
  switch ( action.type ) {
  case actionTypes.LOGIN:
    return true;
  case actionTypes.LOGOUT:
    return false;
  default:
    return state;
  }
};

const reducer = combineReducers({
  user: combineReducers({
    name
  })
});

// ACTIONS
export const loginUser = () => dispatch => {
  return dispatch({ type: actionTypes.LOGIN });
};

export const logoutUser = () => dispatch => {
  return dispatch({ type: actionTypes.LOGOUT });
};

export function initializeStore( initialState = exampleInitialState ){
  return createStore( 
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}