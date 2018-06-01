import { connect } from 'react-redux';
import SignUpForm from '../ui/SignUpForm';
import { 
  createUser, 
  cancelFetching, 
  addAlertMessage } from '../../store/actions';

const mapStateToProps = ( state ) => {
  return {
    isFetching: state.fetching
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleFormSubmission: ( dataObj ) => {
      return dispatch( createUser( dataObj ));
    },
    handleResponseReceived: () => {
      return dispatch( cancelFetching() );
    },
    handleResponseMessage: ( errorMessage, success = false ) => {
      return dispatch( addAlertMessage( errorMessage, success ));
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

export default Container;