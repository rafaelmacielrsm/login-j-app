import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import numericMask from '../../helpers/numeric-mask';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import t from '../../config/locales';
import { config as generalConfig } from '../../config/general';
import DefaultInput from './shared/DefaultInput';
import PasswordInput from './shared/PasswordInput';
import Router from 'next/router';
import Link from 'next/link';
import { 
  defaultLink,
  fadeInAnimation,
  fluidValue,
  primaryCard,
  colorPallet, 
  defaultButton } from './assets/common';

class EditUserForm extends React.Component {
  constructor( props ){
    super(props);

    this.state = {
      isValid: true,
      errors: { 
        name: undefined,
        email: undefined,
        password: undefined,
        phone_number: undefined,
        username: undefined
      },
      isRevealing: false
    };

    this.title = t( 'page.editUser.title' );
    this.nameInput = null;
    this.emailInput = null;
    this.phoneNumberInput = null;
    this.passwordInput = null;
    this.usernameInput = null;
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onRevealField = this.onRevealField.bind(this);
    this.handlePhoneInput = this.handlePhoneInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  validateUsername = () => {
    let inputValue = this.usernameInput.value;

    if( inputValue === this.props.userData.username ) { 
      this.validateInputs();
      return; 
    }
    
    this.props.handleUsernameValidation( inputValue )
      .then( async (response) => {    
        const status = response.status;
        const errors = this.state.errors;    

        if( status == 400 ){
          errors['username'] = t( 'error.blank' );
          this.setState({ errors });
        }else{          
          const data = await response.json(); 
          errors['username'] = data.message;
          this.setState({ errors });
        }
      })
      .catch(() => this.props.handleResponseMessage( t( 'error.network' )));
  }

  handlePhoneInput = () => {
    let inputValue = this.phoneNumberInput.value;    

    this.phoneNumberInput.value = numericMask(inputValue, generalConfig.phoneMask);

    this.validateInputs();
  }

  onSubmitForm = (ev) => {
    ev.preventDefault();

    const userData = {
      name: this.nameInput.value, 
      email: this.emailInput.value, 
      password: this.passwordInput.value, 
      phone_number: this.phoneNumberInput.value, 
      username:this.usernameInput.value ,
    };

    Object.keys( userData )
      .filter( key => !userData[ key ] || userData[key] === this.props.userData[key] )
      .forEach( key => delete userData[ key ] );

    this.props.handleFormSubmission( userData )
      .then(async (response) => {
        this.props.handleResponseReceived();

        const { status } = response;
        const data = await response.json();

        if (status === 422) {
          let errors = {};
          const messagesObj = JSON.parse(data.message);
          
          for (const key in messagesObj) {
            errors[key] = messagesObj[key][0];
          }
          
          this.setState({ errors, isValid: false });
        }

        if ( status === 200 ) {
          this.props.handleUpdateSuccess();
          this.props.handleResponseMessage( data.message, true );
          
          Router.push( '/user/profile' );
        }
      })
      .catch(() => this.props.handleResponseMessage( t('error.network')));
  }

  validateInputs = () => {
    let errors = {};
    const values = {
      name: this.nameInput.value, 
      email: this.emailInput.value,
      password: this.passwordInput.value,
      phone_number: this.phoneNumberInput.value
    };    

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
      isValid: Object.keys(errors).length === 0
    });
  } 

  onRevealField = () => {
    this.setState({ isRevealing: !this.state.isRevealing });
  }

  render() {
    const { isValid, isRevealing, errors } = this.state;
    const { name, email, username } = this.props.userData;
    return (
      <form className={ css( styles.signupForm, styles.formAnimation )}>
        <section className={ css( styles.heading )} >
          <h1 className={ css( styles.title )} >{ this.title }</h1>
        </section>

        <DefaultInput 
          htmlID='name'
          initialValue={ name }
          labelText={ t( 'label.name' ) }
          errorMessage={ errors.name }
          onChangeHandle={ this.validateInputs }
          refInput={ (el) => this.nameInput = el } />

        <DefaultInput 
          htmlID='email'
          initialValue={ email }
          labelText={ t( 'label.email' ) }
          errorMessage={ errors.email }
          onChangeHandle={ this.validateInputs }
          refInput={ (el) => this.emailInput = el } />

        <DefaultInput 
          htmlID='username'
          initialValue={ username }
          labelText={ t( 'label.username' ) }
          errorMessage={ errors.username }
          onChangeHandle={ this.validateUsername }
          refInput={ (el) => this.usernameInput = el } />

        <DefaultInput 
          htmlID='phone_number'
          debounce={ false }
          labelText={ t( 'label.phone_number' ) }
          errorMessage={ errors.phone_number }
          onChangeHandle={ this.handlePhoneInput }
          refInput={ (el) => this.phoneNumberInput = el } />

        <PasswordInput 
          htmlID='password'
          labelText={ t( 'label.password' ) }
          isRevealing ={ isRevealing }
          errorMessage={ errors.password }
          onChangeHandle={ this.validateInputs }
          revealFieldHandle={ this.onRevealField }
          refInput={ (el) => this.passwordInput = el } />

        <section className={ css( styles.formActions )} >
          <Link prefetch href="/user/profile">
            <a className={ css( styles.defaultLink )} > Voltar </a>
          </Link>

          <button 
            className={ css( styles.button )} 
            disabled={ !isValid || this.props.isFetching }
            onClick={ this.onSubmitForm }> 
            
            { t( 'label.button.update' )}            
          </button>
        </section>
      </form>
    );
  }
}

EditUserForm.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
  handleResponseReceived: PropTypes.func.isRequired,
  handleResponseMessage: PropTypes.func.isRequired,  
  handleUsernameValidation: PropTypes.func.isRequired,  
  handleUpdateSuccess: PropTypes.func.isRequired,  
  isFetching: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  signupForm: primaryCard.body,

  title: primaryCard.title,

  heading: primaryCard.head,

  button: defaultButton,

  formAnimation: fadeInAnimation,

  defaultLink,

  svgIcon: {
    boxShadow: '-1px 5px 15px rgba(0, 0, 0, 1)',
    fill: colorPallet.textSecundary,
    stroke: colorPallet.textSecundary,
    borderRadius: 4,
    marginRight: 0,
    height: '36px',
    backgroundColor: colorPallet.secundary,
    zIndex: 1,
    '@media screen and (min-width: 320px)':{
      height: fluidValue(36, 52),
    },
    '@media screen and (min-width: 768px)':{
      height: '52px',
    },
    ':hover': {
      cursor: 'pointer',
      backgroundColor: colorPallet.secundaryDark,
    }    
  },

  formActions: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '.5em',
  },

  loginLink: {
    paddingTop: '8px',
    color: colorPallet.textPrimary,
  },
});

export default EditUserForm;