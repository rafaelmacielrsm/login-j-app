import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colorPallet } from '../assets/common';
import { fluidValue } from '../assets/common';

const Alert = ({ message, handleClick }) => {
  return(
    <div 
      onClick={() => handleClick() }
      className={ css( styles.alertContainer )} >

      <span className={ css( styles.alertMessage ) }>
        <p className={ css( styles.paragraph )} >
          { message }
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
      fontSize: fluidValue(16, 24),
    },
    '@media screen and (min-width: 768px)':{
      fontSize: '24px',
    },
  },
  alertContainer: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    boxShadow: '0 0 10px black',
    justifyContent: 'center',
    backgroundColor: colorPallet.alert,
    height: '52px',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    zIndex: '10',
    overflow: 'hidden',
    ':hover': {
      cursor: 'pointer',
    },
    '@media screen and (min-width: 320px)':{
      height: fluidValue(52, 64),
    },
    '@media screen and (min-width: 768px)':{
      height: '64px',
    },
    animationName: {
      'from': {
        opacity: 0,
        bottom: '-5%',
        transform: 'scale(1.5, 1.5)'
      },
      '50%': {
        bottom: '0',        
        opacity: 1,
        transform: 'scale(1, 1)'
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