import { connect } from 'react-redux';
import LoginForm from '../ui/LoginForm';
import { loginUser } from '../../store/actions';

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleLoginUser: (  ) => {
      const stubUser = {
        name: 'test',
        email: 'test@example.com',
        identifier: '321'
      };
      
      return dispatch( loginUser( stubUser ));
    }
  };
};

const Container = connect(null, mapDispatchToProps)(LoginForm);

export default Container;