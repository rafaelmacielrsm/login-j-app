import { connect } from 'react-redux';
import EditUserForm from '../ui/EditUserForm';
import { 
  removeUserData,
  validateUsername,
  updateUser, 
  cancelFetching, 
  addAlertMessage } from '../../store/actions';

const mapStateToProps = ( state ) => {
  return {
    isFetching: state.fetching,
    userData: state.userData
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleFormSubmission: ( dataObj ) => {
      return dispatch( updateUser( dataObj ));
    },
    handleResponseReceived: () => {
      return dispatch( cancelFetching() );
    },
    handleResponseMessage: ( errorMessage, success = false ) => {
      return dispatch( addAlertMessage( errorMessage, success ));
    },
    handleUsernameValidation: ( userName ) => {
      return validateUsername( userName );
    },
    handleUpdateSuccess: () => {
      return dispatch( removeUserData() );
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(EditUserForm);

export default Container;