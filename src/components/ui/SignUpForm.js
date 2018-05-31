import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import numericMask from '../../helpers/numeric-mask';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import t from '../../config/locales';
import { config as generalConfig } from '../../config/general';
import DefaultInput from './shared/DefaultInput';
import PasswordInput from './shared/PasswordInput';
// import Router from 'next/router';
import Link from 'next/link';
import { 
  primaryCard,
  colorPallet, 
  defaultLink,
  defaultButton } from './assets/common';

class SignUpForm extends React.Component {
  constructor( props ){
    super(props);

    this.state = {
      isValid: false,
      errors: { 
        name: undefined,
        email: undefined,
        password: undefined,
        phone_number: undefined
      },
      isRevealing: false
    };

    this.title = t( 'page.signup.title' );
    this.nameInput = null;
    this.emailInput = null;
    this.phoneNumberInput = null;
    this.passwordInput = null;
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onRevealField = this.onRevealField.bind(this);
    this.handlePhoneInput = this.handlePhoneInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  handlePhoneInput = () => {
    let inputValue = this.phoneNumberInput.value;    

    this.phoneNumberInput.value = numericMask(inputValue, generalConfig.phoneMask);

    this.validateInputs();
  }

  onSubmitForm = (ev) => {
    ev.preventDefault();

    const [name, email, password, phone_number] = [ 
      this.nameInput.value,
      this.emailInput.value, 
      this.passwordInput.value,
      this.phoneNumberInput.value,
    ];

    this.props.handleFormSubmission( { name: '', email, password, phone_number } )
      .then(async (response) => {
        this.props.handleResponseReceived();

        const { status } = response;
        if (status === 422) {
          let errors = {};

          const data = await response.json();

          const messagesObj = JSON.parse(data.message);
          
          for (const key in messagesObj) {
            errors[key] = messagesObj[key][0];
          }
          
          this.setState({ errors, isValid: false });
        }
      })
      .catch(() => this.props.handleResponseError( t('error.network')));
  }

  validateInputs = () => {
    let errors = {};
    let hasEmptyValues;
    const values = {
      name: this.nameInput.value, 
      email: this.emailInput.value,
      password: this.passwordInput.value,
      phone_number: this.phoneNumberInput.value
    };    

    hasEmptyValues = Object.values(values).some( value => value === '' );

    if ( values.name !== '' && !isLength( values.name, {min: 4} ) ) {
      errors['name'] = t('error.short')(4);
    }    

    if ( values.email !== '' && !isEmail( values.email ) ) {
      errors['email'] = t('error.invalid_email');
    }

    if ( values.password !== '' && !isLength( values.password, {min: 6} ) ) {
      errors['password'] = t('error.short')(6);
    }    

    if ( values.phone_number !== '' && 
      !isLength( values.phone_number, {min: generalConfig.phoneMask.length})){

      errors['phone_number'] = t('error.invalid_format')(generalConfig.phoneMask);
    }    

    this.setState({ 
      errors,
      isValid: !hasEmptyValues && Object.keys(errors).length === 0
    });
  } 

  onRevealField = () => {
    this.setState({ isRevealing: !this.state.isRevealing });
  }

  render() {
    const { isValid, isRevealing, errors } = this.state;
    return (
      <form className={ css( styles.signupForm )}>
        <section>
          <h1 className={ css( styles.heading )} >{ this.title }</h1>
        </section>

        <DefaultInput 
          htmlID='name'
          labelText={ t( 'label.name' ) }
          errorMessage={ errors.name }
          onChangeHandle={ this.validateInputs }
          refInput={ (el) => this.nameInput = el } />

        <DefaultInput 
          htmlID='email'
          labelText={ t( 'label.email' ) }
          errorMessage={ errors.email }
          onChangeHandle={ this.validateInputs }
          refInput={ (el) => this.emailInput = el } />

        <PasswordInput 
          htmlID='password'
          labelText={ t( 'label.password' ) }
          isRevealing ={ isRevealing }
          errorMessage={ errors.password }
          onChangeHandle={ this.validateInputs }
          revealFieldHandle={ this.onRevealField }
          refInput={ (el) => this.passwordInput = el } />

        <DefaultInput 
          debounce={ false }
          htmlID='phone_number'
          labelText={ t( 'label.phone_number' ) }
          errorMessage={ errors.phone_number }
          onChangeHandle={ this.handlePhoneInput }
          refInput={ (el) => this.phoneNumberInput = el } />

        <section className={ css( styles.formActions )} >
          <button 
            className={ css( styles.button )} 
            disabled={ !isValid || this.props.isFetching }
            onClick={ this.onSubmitForm }> 
            
            { t( 'label.button.register' )}
          </button>

          <span className={ css( styles.loginLink )} >
            { t('link.has_account') } 
            <Link prefetch href="/login">
              <a style={ defaultLink } >{ t('link.login') }</a>
            </Link>
          </span>
        </section>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
  handleResponseReceived: PropTypes.func.isRequired,
  handleResponseError: PropTypes.func.isRequired,  
  isFetching: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  signupForm: primaryCard.body,

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

export default SignUpForm;