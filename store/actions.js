import C from './constants';

export const loginUser = ( userObj ) => dispatch => {
  return dispatch({ type: C.LOGIN, payload: userObj });
};

export const logoutUser = () => dispatch => {
  return dispatch({ type: C.LOGOUT });
};