import PropTypes from 'prop-types';
import React from 'react';
import Label from './FormLabel';
import { StyleSheet, css } from 'aphrodite';
import { fluidValue } from '../assets/common';
import debounce from 'lodash/debounce';
import InputError from './InputError';

const DefaultInput = ( props ) => {
  return(
    <section className={ css( styles.inputGroup )}>
      <Label htmlFor={ props.htmlID }>{ props.labelText }</Label>

      <input 
        defaultValue={ props.initialValue }
        id={ props.htmlID }
        className={ css( styles.input )}
        onChange={ props.debounce != false
          ? debounce( props.onChangeHandle, 400) 
          : () => props.onChangeHandle() }
        ref={ (ev) => props.refInput( ev ) }
        type="text" 
        autoComplete="off" />

      { props.errorMessage && <InputError message={ props.errorMessage }/> }
    </section>
  );
};

DefaultInput.propTypes = {
  htmlID: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
  refInput: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default DefaultInput;

const styles = StyleSheet.create({
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: '0.5em',
    width: '100%',
    overflow: 'hidden',
  },

  input: {
    width: 'calc(100% - 16px)',
    border: 0,
    padding: '5px 8px',
    boxShadow: '1px 2px 4px black',
    borderRadius: 4,
    fontSize: 16,
    lineHeight: '26px',
    '@media screen and (min-width: 320px)':{
      fontSize: fluidValue(16,20),
      lineHeight: fluidValue(26, 36),
    },
    '@media screen and (min-width: 768px)':{
      fontSize: 20,
      lineHeight: '36px',
    },
  },
});