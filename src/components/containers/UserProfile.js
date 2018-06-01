import { connect } from 'react-redux';
import UserProfile from '../ui/UserProfile';
import { 
  logoutUser,
  cancelFetching, 
  addAlertMessage } from '../../store/actions';

const mapStateToProps = ( state ) => {
  return {
    isFetching: state.fetching,
    userData: state.userData,
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleLogoutAction: () => {
      return dispatch( logoutUser() );
    },
    handleResponseReceived: () => {
      return dispatch( cancelFetching() );
    },
    handleResponseMessage: ( errorMessage, success = false ) => {
      return dispatch( addAlertMessage( errorMessage, success ));
    },
  };
};

const Container = connect( mapStateToProps, mapDispatchToProps )( UserProfile );

export default Container;