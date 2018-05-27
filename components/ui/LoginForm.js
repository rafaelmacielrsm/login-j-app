import PropTypes from 'prop-types';

const LoginForm = ( props ) => {
  const handleLoginButton = ( e ) => {
    e.preventDefault();
    props.handleLoginUser();
  };

  return(
    <form>
      <h1>text</h1>
      <button onClick={ handleLoginButton }>login</button>
      <button>logout</button>
    </form>    
  );
};

LoginForm.propTypes = {
  handleLoginUser: PropTypes.func.isRequired
};

export default LoginForm;