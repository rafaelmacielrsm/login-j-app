import { connect } from 'react-redux';
import SignUpForm from '../ui/SignUpForm';
import { 
  createUser, 
  cancelFetching, 
  addErrorMessage } from '../../store/actions';

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleFormSubmission: ( dataObj ) => {
      return dispatch( createUser( dataObj ));
    },
    handleResponseReceived: () => {
      return dispatch( cancelFetching() );
    },
    handleResponseError: ( errorMessage ) => {
      return dispatch( addErrorMessage( errorMessage ));
    }
  };
};

const Container = connect(null, mapDispatchToProps)(SignUpForm);

export default Container;