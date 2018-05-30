import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Label from './shared/FormLabel';
import HideIcon from '../../../static/assets/icons/hide.svg';
import ViewIcon from '../../../static/assets/icons/view.svg';
import numericMask from '../../helpers/numeric-mask';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import debounce from 'lodash/debounce';
import t from '../../config/locales';
import { config as generalConfig } from '../../config/general';
import { 
  defaultInput, 
  colorPallet, 
  fluidValue,
  defaultButton } from './assets/common';

class SignUpForm extends React.Component {
  constructor( props ){
    super(props);

    this.state = {
      isValid: false,
      errors: { 
        name: '',
        email: '',
        password: '',
        phone_number: ''
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

  handlePhoneInput = ( event ) => {
    let inputValue = event.target.value;    

    event.target.value = numericMask(inputValue, generalConfig.phoneMask);

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

    this.props.handleFormSubmission( { name: '', email: 'ra@ge', password: '', phone_number: '' } )
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
    const { isValid, isRevealing } = this.state;
    return (
      <form className={ css( styles.signupForm )}>
        <section>
          <h1>{ this.title }</h1>
        </section>

        <section className={ css( styles.inputGroup )}>
          <Label htmlFor="name">{ t( 'label.name' )}</Label>

          <input 
            id="name"
            autoComplete="off"
            className={ css( styles.input )}
            onChange={ debounce(this.validateInputs, 400) }
            ref={(el) => this.nameInput = el}
            type="text"/>

          { this.state.errors.name }
        </section>

        <section className={ css( styles.inputGroup )}>
          <Label htmlFor="email">{ t( 'label.email' )}</Label>

          <input 
            id="email"
            autoComplete="off"
            className={ css( styles.input )}
            onChange={ debounce(this.validateInputs, 400) }
            ref={(el) => this.emailInput = el}
            type="text"/>

          { this.state.errors.email }
        </section>

        <section className={ css( styles.inputGroup )}>
          <Label htmlFor="password">{ t( 'label.password' )}</Label>

          <div className={ css( styles.inputGroupWithIcon )}>
            <input 
              id="password"
              className={ css( [styles.input, styles.inputWithAction ])}
              onChange={ debounce(this.validateInputs, 400) }
              ref={(el) => this.passwordInput = el}
              type={ isRevealing? 'text' : 'password' }/>

            { isRevealing 
              ? <HideIcon 
                className={ css( styles.svgIcon ) } 
                onClick={this.onRevealField}/>
              : <ViewIcon 
                className={ css( styles.svgIcon ) }
                onClick={this.onRevealField} /> }
          </div>

          { this.state.errors.password }
        </section>

        <section className={ css( styles.inputGroup )}>
          <Label htmlFor="phone-number">{ t( 'label.phone_number' )}</Label>

          <input 
            id="phone-number"
            autoComplete="off"
            className={ css( styles.input )}
            onChange={this.handlePhoneInput}
            ref={(el) => this.phoneNumberInput = el}
            type="text"/>

          { this.state.errors.phone_number }
        </section>

        <section>
          <button 
            className={ css( styles.button )} 
            disabled={ !isValid }
            onClick={ this.onSubmitForm }> 
            
            { t( 'label.button.register' )}
          </button>
        </section>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
  handleResponseReceived: PropTypes.func.isRequired,
  handleResponseError: PropTypes.func.isRequired,  
};

const styles = StyleSheet.create({
  signupForm: {
    width: '100%',
    border: '1px solid black',
    borderRadius: '8px',
    boxSizing: 'border-box',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0.5em',
    color: colorPallet.textPrimary,
    backgroundColor: colorPallet.primary,
  },

  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: '1em',
    width: '100%',
  },
  
  inputGroupWithIcon: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  input: defaultInput,

  inputWithAction: {
    width: '100%',
    paddingRight: fluidValue(36, 51.5),
    boxSizing: 'border-box',
  },

  svgIcon: {
    boxShadow: '-1px 5px 10px rgba(0, 0, 0, 1)',
    position: 'absolute',
    alignSelf: 'flex-end',
    fill: colorPallet.textSecundary,
    stroke: colorPallet.textSecundary,
    borderRadius: 4,
    marginRight: 0,
    height: '36px',
    backgroundColor: colorPallet.secundary,
    '@media screen and (min-width: 320px)':{
      height: fluidValue(36, 51.5),
    },
    '@media screen and (min-width: 768px)':{
      height: '51.5px',
    },
    ':hover': {
      cursor: 'pointer',
      backgroundColor: colorPallet.secundaryDark,
    }    
  },

  button: defaultButton
});

export default SignUpForm;