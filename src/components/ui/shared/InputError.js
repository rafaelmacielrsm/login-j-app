import React from 'react';
import { colorPallet } from '../assets/common';
import { StyleSheet, css } from 'aphrodite/no-important';

const InputError = ( { message } ) => {
  return(
    <div className={ css( styles.inputErrorContainer )} >
      <p className={ css( styles.inputError )} >
        { message }
      </p>
    </div>
  );
};

const styles = StyleSheet.create({
  inputErrorContainer: {
    backgroundColor: colorPallet.alert,
    width: '100%',
    height: '100%',
    position: 'relative',
    top: '0',
    borderRadius: 4,
    opacity: 1,
    boxShadow: '1px 2px 4px black',
    animationName: {
      'from': {
        height: 0,
        opacity: 0,
      },
      'to': {
        height: '100%',
        opacity: 1,
      }
    },
    animationDuration: '.5s',
    animationIterationCount: '1',
    animationTimingFunction: 'linear',    
  },

  inputError: {
    textAlign: 'center',
    width: '100%',
    margin: 0,
    boxSizing: 'border-box',
    padding: '0 .25em',
  },
});

export default InputError;