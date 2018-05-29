import React from 'react';
import { StyleSheet, css } from 'aphrodite';

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
      }
    };
  }

  render() {
    const { isValid } = this.state;
    return (
      <form className={ css( styles.signupForm )}>
        <section>
          <h1>Sign up</h1>
        </section>

        <section className={ css( styles.inputGroup )}>
          <label htmlFor="name">Name</label>
          <input type="text"/>
        </section>

        <section className={ css( styles.inputGroup )}>
          <label htmlFor="email">Email</label>
          <input type="text"/>
        </section>

        <section className={ css( styles.inputGroup )}>
          <label htmlFor="password">Password</label>
          <input type="password"/>
        </section>

        <section className={ css( styles.inputGroup )}>
          <label htmlFor="phone_number">Phone Number</label>
          <input type="text"/>
        </section>

        <section>
          <button 
            disabled={ !isValid }
            onClick={f => f}> 
            
            Register 
          </button>
        </section>
      </form>
    );
  }
}

const styles = StyleSheet.create({
  signupForm: {
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

export default SignUpForm;