import C from './constants';
import { loginRequest, createUserRequest } from '../lib/api-connection';

export const loginUser = ( email, password ) => ( dispatch )  => {
  dispatch( fetching() );

  setTimeout(() => {
    dispatch( cancelFetching() );
  }, 3000);

  return loginRequest(email, password);
};

export const createUser = ( userDataObj ) => ( dispatch )  => {
  dispatch( fetching() );

  setTimeout(() => {
    dispatch( cancelFetching() );
  }, 3000);

  return createUserRequest( userDataObj );
};

export const logoutUser = () => dispatch => {
  return dispatch({ type: C.LOGOUT });
};

export const fetching = () => ( dispatch ) => {
  return dispatch({ type: C.FETCHING });
};

export const cancelFetching = () => ( dispatch, getState ) => {
  if ( getState().fetching ) {
    return dispatch({ type: C.CANCEL_FETCHING });    
  }
};

export const addAlertMessage = ( message ) => ( dispatch ) => {
  return dispatch({ type: C.ADD_ALERT, payload: message });
};

export const removeAlertMessage = ( index ) => ( dispatch ) => {
  return dispatch({ type: C.CLEAR_ALERT, payload: index });
};