import { connect } from 'react-redux';
import LoginForm from '../ui/LoginForm';
import { loginUser, cancelFetching, addAlertMessage } from '../../store/actions';

const mapStateToProps = ( state ) => {
  return {
    isFetching: state.fetching
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleLogin: ( email, password ) => {
      return dispatch( loginUser( email, password ));
    },
    handleResponseReceived: () => {
      return dispatch( cancelFetching() );
    },
    handleResponseError: ( errorMessage ) => {
      return dispatch( addAlertMessage( errorMessage ));
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Container;