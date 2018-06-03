import { config } from '../config/general';
import t from '../config/locales';
import C from './constants';
import Router from 'next/router';
import { 
  validateUserNameRequest,
  logoutUserRequest,
  loginRequest, 
  fetchUserData,
  updateUserRequest,
  createUserRequest } from '../lib/api-connection';


export const addAuthenticatedUserData = ( userData ) => ( dispatch ) => (
  dispatch({ type: C.ADD_USER_INFO, payload: userData })
);

export const fetchAuthenticatedUser = ( credential ) => ( dispatch )  => {
  dispatch( fetching() );

  setTimeout(() => {
    dispatch( cancelFetching() );
  }, 3000);

  return fetchUserData( credential );
};

export const loginUserRequest = ( email, password ) => ( dispatch )  => {
  dispatch( fetching() );

  setTimeout(() => {
    dispatch( cancelFetching() );
  }, 3000);

  return loginRequest(email, password);
};

export const loginUser = ( authToken ) => ( dispatch ) => {
  return (
    dispatch(
      { 
        type: C.LOGIN,
        payload: {  token: authToken, expireAt: config.expireTime() }
      }
    )
  );
};

export const createUser = ( userDataObj ) => ( dispatch )  => {
  dispatch( fetching() );

  setTimeout(() => {
    dispatch( cancelFetching() );
  }, 3000);

  return createUserRequest( userDataObj );
};

export const updateUser = ( userDataObj ) => ( dispatch, getState )  => {
  dispatch( fetching() );

  setTimeout(() => {
    dispatch( cancelFetching() );
  }, 3000);

  const id = getState().userData.id;
  const token = getState().auth.token;
  
  return updateUserRequest( token, id, userDataObj );
};

export const removeUserData = (  ) => ( dispatch ) => {
  return dispatch({ type: C.REMOVE_USER_INFO });
};

export const logoutUser = () => ( dispatch, getState ) => {
  const token = getState().auth.token;

  logoutUserRequest( token )
    .then( async (response) => {
      const { status } = await response;

      if (status == 200) {
        dispatch({ type: C.LOGOUT });
        dispatch( addAlertMessage( t( 'success.logout' )));
        Router.replace('/login');
      }
    })
    .catch( () => {
      console.log('err?');
      dispatch( addAlertMessage( t( 'error.network' )));
    });
};

export const fetching = () => ( dispatch ) => {
  return dispatch({ type: C.FETCHING });
};

export const cancelFetching = () => ( dispatch, getState ) => {
  if ( getState().fetching ) {
    return dispatch({ type: C.CANCEL_FETCHING });    
  }
};

export const addAlertMessage = ( message, success = false ) => ( dispatch ) => {
  return dispatch({ type: C.ADD_ALERT, payload: { message, success }});
};

export const removeAlertMessage = ( index ) => ( dispatch ) => {
  return dispatch({ type: C.CLEAR_ALERT, payload: index });
};

export const validateUsername = ( username ) =>  {
  return validateUserNameRequest( username );
};

