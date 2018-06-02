import React from 'react';
import PropTypes from 'prop-types';
import Label from './FormLabel';
import { StyleSheet, css } from 'aphrodite';
import { fluidValue } from '../assets/common';
import debounce from 'lodash/debounce';
import InputError from './InputError';
import HideIcon from '../../../../static/assets/icons/hide.svg';
import ViewIcon from '../../../../static/assets/icons/view.svg';
import { colorPallet } from '../assets/common';


const PasswordInput = ( props ) => {
  return(
    <section className={ css( styles.inputGroup )}>
      <Label htmlFor={ props.htmlID }>{ props.labelText }</Label>

      <div className={ css( styles.inputGroupWithIcon )}>
        <input 
          id={ props.htmlID }
          className={ css( [styles.input, styles.inputWithAction ])}
          onChange={ debounce( props.onChangeHandle, 400) }
          ref={ (ev) => props.refInput( ev ) }
          type={ props.isRevealing ? 'text' : 'password' }
          autoComplete="off" />

        { props.isRevealing 
          ? <HideIcon 
            className={ css( styles.svgIcon ) } 
            onClick={ () => props.revealFieldHandle() }/>
          : <ViewIcon 
            className={ css( styles.svgIcon ) }
            onClick={ () => props.revealFieldHandle() } /> }
      </div>

      { props.errorMessage && <InputError message={ props.errorMessage }/> }
    </section>    
  );
};

PasswordInput.propTypes = {
  errorMessage: PropTypes.string,
  htmlID: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  isRevealing: PropTypes.bool.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
  refInput: PropTypes.func.isRequired,
  revealFieldHandle: PropTypes.func.isRequired,
};

export default PasswordInput;

const styles = StyleSheet.create({
  inputGroup: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
    paddingBottom: '0.5em',
    width: '100%',
    overflow: 'hidden',
  },

  inputGroupWithIcon: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
  },

  input: {
    flexGrow: 1,
    border: 0,
    padding: '0 8px',
    boxShadow: '1px 2px 4px black',
    borderRadius: '4px 0 0 4px',
    fontSize: 16,
    lineHeight: '26px',
    '@media screen and (min-width: 320px)':{
      fontSize: fluidValue(16,24),
      lineHeight: fluidValue(26, 42),
    },
    '@media screen and (min-width: 768px)':{
      fontSize: 24,
      lineHeight: '42px',
    },
  },

  svgIcon: {
    flexGrow: 0,
    boxShadow: '1px 2px 4px black',
    fill: colorPallet.textSecundary,
    stroke: colorPallet.textSecundary,
    borderRadius: '0 4px 4px 0',
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
});