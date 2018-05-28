import C from './constants';
import { loginRequest } from '../lib/api-connection';

export const loginUser = ( email, password ) => ( dispatch )  => {
  dispatch( fetching() );

  setTimeout(() => {
    dispatch( cancelFetching() );
  }, 2000);

  return loginRequest(email, password);
};

export const logoutUser = () => dispatch => {
  return dispatch({ type: C.LOGOUT });
};

export const fetching = () => ( dispatch ) => {
  return dispatch({ type: C.FETCHING });
};

export const cancelFetching = () => ( dispatch ) => {
  return dispatch({ type: C.CANCEL_FETCHING });
};