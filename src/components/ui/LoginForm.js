import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { StyleSheet, css } from 'aphrodite';
import isEmail from 'validator/lib/isEmail';
import t from '../../config/locales';
import DefaultInput from './shared/DefaultInput';
import PasswordInput from './shared/PasswordInput';
import { 
  defaultButton, 
  primaryCard, 
  defaultLink,
  colorPallet } from './assets/common';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isValid: false,
      isRevealingPassord: false,
      errors: { 
        email: '',
        password: '',
      }
    };

    this.emailInput = null;
    this.passwordInput = null;
    this.validateInputs = this.validateInputs.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onRevealField = this.onRevealField.bind(this);
  }

  onRevealField = () => {
    this.setState({ isRevealingPassord: !this.state.isRevealingPassord });
  }

  validateInputs = () => {    
    let errors = {};
    let hasEmptyValues;
    const [email, password] = [ this.emailInput.value, this.passwordInput.value];

    hasEmptyValues = (email === '' || password === ''); 

    if ( !isEmail( email ) && email !== '' ) {
      errors['email'] = t( 'error.invalid_email' );
    }

    this.setState({ 
      errors,
      isValid: !hasEmptyValues && Object.keys(errors).length === 0
    });
  } 

  onSubmitForm = (ev) => {
    ev.preventDefault();

    const [email, password] = [ this.emailInput.value, this.passwordInput.value];

    this.props.handleLogin( email, password )
      .then(async (response) => {
        this.props.handleResponseReceived();

        const { status } = response;
        const data = await response.json();

        if (status == 401) {
          this.props.handleResponseError(data.message);
        }
      })
      .catch(() => this.props.handleResponseError( t('error.network')));
  }

  render() {
    const { errors, isValid, isRevealingPassord } = this.state;
    return (
      <form className={ css(styles.loginForm) }>
        <section>
          <h1 className={ css( styles.heading )} >{ t( 'page.login.title' ) }</h1>
        </section>

        <DefaultInput 
          htmlID='email'
          labelText={ t( 'label.email' ) }
          errorMessage={ errors.email }
          onChangeHandle={ this.validateInputs }
          refInput={ (el) => this.emailInput = el } />
          
        <PasswordInput 
          htmlID='password'
          labelText={ t( 'label.password' ) }
          isRevealing ={ isRevealingPassord }
          errorMessage={ errors.password }
          onChangeHandle={ this.validateInputs }
          revealFieldHandle={ this.onRevealField }
          refInput={ (el) => this.passwordInput = el } />

        <section className={ css( styles.formActions )} >
          <button 
            className={ css( styles.button )} 
            disabled={ !isValid || this.props.isFetching }
            onClick={ this.onSubmitForm }> 
            
            { t( 'label.button.login' )}
          </button>

          <span className={ css( styles.loginLink )} >
            { t('link.no_account') } 
            <Link prefetch href="/signup">
              <a style={ defaultLink } >{ t('link.signup') }</a>
            </Link>
          </span>
        </section>
      </form> 
    );
  }
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleResponseReceived: PropTypes.func.isRequired,
  handleResponseError: PropTypes.func.isRequired,  
  isFetching: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  loginForm: primaryCard.body,

  heading: primaryCard.head,

  button: defaultButton,

  formActions: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '.5em',
  },

  loginLink: {
    paddingTop: '8px',
    color: colorPallet.textPrimary,
  },
});

export default LoginForm;