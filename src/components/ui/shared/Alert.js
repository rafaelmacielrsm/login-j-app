import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colorPallet } from '../assets/common';
import { fluidValue } from '../assets/common';

const Alert = ({ alert, handleClick }) => {
  return(
    <div 
      onClick={() => handleClick() }
      className={ css( styles.alertContainer, alert.success && styles.error)} >

      <span className={ css( styles.alertMessage ) }>
        <p className={ css( styles.paragraph )} >
          { alert.message }
        </p>
      </span>
    </div>
  );
};

export default Alert;

const styles = StyleSheet.create({
  
  paragraph: {
    margin: '0 24px',
    textAlign: 'center',
  },
  
  alertMessage: {
    fontSize: 16,
    margin: 0,
    padding: 0,
    text: 'val',
    bottom: 0,
    '@media screen and (min-width: 320px)':{
      fontSize: fluidValue(16, 20),
    },
    '@media screen and (min-width: 768px)':{
      fontSize: '20px',
    },
  },

  error: {
    backgroundColor: colorPallet.success,
    color: colorPallet.textSecundary,
  },

  alertContainer: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    boxShadow: '0 0 10px black',
    justifyContent: 'center',
    backgroundColor: colorPallet.alert,
    color: colorPallet.textPrimary,
    height: '44px',
    position: 'fixed',
    bottom: '0',
    right: '0',
    width: '100%',
    zIndex: '10',
    overflow: 'hidden',
    transform: 'scale(1, 1)',
    ':hover': {
      cursor: 'pointer',
    },
    '@media screen and (min-width: 320px)':{
      height: fluidValue(44, 56),
    },
    '@media screen and (min-width: 768px)':{
      height: '56px',
    },
    '@supports (grid-area: auto)': {
      '@media screen and (min-width: 769px)': {
        maxWidth: '43em',
        width: 'auto',
        margin: '0 auto',
        position: 'fixed',
        left: '0',
        bottom: '0',
      }
    },
    animationName: {
      'from': {
        opacity: 0,
        transform: 'scale(1.5, 1.5)',
        bottom: '-5%',
      },
      '50%': {
        transform: 'scale(1, 1)',
        bottom: '0',        
        opacity: 1,
      },
      'to': {
        opacity: 1,
        bottom: '0', 
      }
    },
    animationDuration: '1s',
    animationIterationCount: '1',
    animationTimingFunction: 'easy-in',
  },
});