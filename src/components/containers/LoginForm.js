import { connect } from 'react-redux';
import LoginForm from '../ui/LoginForm';
import { 
  loginUser,
  loginUserRequest, 
  cancelFetching, 
  addAlertMessage } from '../../store/actions';

const mapStateToProps = ( state ) => {
  return {
    isFetching: state.fetching
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleFormSubmission: ( email, password ) => {
      return dispatch( loginUserRequest( email, password ));
    },
    handleResponseReceived: () => {
      return dispatch( cancelFetching() );
    },
    handleResponseMessage: ( errorMessage, success = false ) => {
      return dispatch( addAlertMessage( errorMessage, success ));
    },
    handleSubmissionSuccess: ( data ) => {
      return dispatch( loginUser( data ));
    }
  };
};

const Container = connect( mapStateToProps, mapDispatchToProps )( LoginForm );

export default Container;