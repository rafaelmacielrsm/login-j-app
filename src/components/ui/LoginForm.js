import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import isEmail from 'validator/lib/isEmail';
import debounce from 'lodash/debounce';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isValid: false,
      errors: { 
        email: '',
        password: '',
      }
    };

    this.emailInput = null;
    this.passwordInput = null;
    this.validateInputs = this.validateInputs.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  validateInputs = () => {
    let errors = {};
    let hasEmptyValues;
    const [email, password] = [ this.emailInput.value, this.passwordInput.value];

    hasEmptyValues = (email === '' || password === ''); 

    if ( !isEmail( email ) && email !== '' ) {
      errors['email'] = 'Not a valid email';
    }

    this.setState({ 
      errors,
      isValid: !hasEmptyValues && Object.keys(errors).length === 0
    });
  } 

  onLoginSubmit = (ev) => {
    ev.preventDefault();

    const [email, password] = [ this.emailInput.value, this.passwordInput.value];

    this.props.handleLogin( email, password )
      .then(response => {
        if (response.status == 401) {
          alert('#TODO unauthorized');
        }else{
          alert('something');
        }
      })
      .catch(() => alert('#TODO disconect'));
  }

  render() {
    const { errors, isValid } = this.state;
    return (
      <form className={ css(styles.loginForm) }>
        <section>
          <h1>Login</h1>
        </section>

        <section className={ css(styles.inputGroup) }>
          <Label targetId="emailInput">Email</Label>

          <input 
            id="emailInput"
            onChange={ debounce(this.validateInputs, 400) }
            ref={(el) => this.emailInput = el}
            type="text" />
          
          { errors.email && <span>{ errors.email }</span> }    
        </section>

        <section className={ css(styles.inputGroup) }>
          <Label targetId="passwordInput">Password</Label>

          <input 
            id="passwordInput"
            onChange={ debounce(this.validateInputs, 400) }
            ref={(el) => this.passwordInput = el}
            type="password" />

          { errors.password && <span>{ errors.password }</span> }
        </section>

        <section>
          <button 
            disabled={ !isValid }
            onClick={ ev => this.onLoginSubmit(ev) }>
            
            login
          </button>
        </section>
      </form> 
    );
  }
}

const Label = ({ targetId, ...props }) => (
  <label 
    className={ css( styles.label ) } 
    htmlFor={ targetId }>
  
    { props.children }
  </label>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  loginForm: {
    border: '1px solid black',
    boxSizing: 'border-box',
    margin: '0 0 10% 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0.5em'
  },

  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '1em'
  },

  label: {
    width: '100%',
    textAlign: 'left'
  }
});

export default LoginForm;