import { connect } from 'react-redux';
import LoginForm from '../ui/LoginForm';
import { loginUser } from '../../store/actions';

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleLogin: ( email, password ) => {
      return dispatch( loginUser( email, password ));
    }
  };
};

const Container = connect(null, mapDispatchToProps)(LoginForm);

export default Container;