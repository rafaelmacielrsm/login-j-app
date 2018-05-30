import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colorPallet } from '../assets/common';

const Loader = () => {
  return(
    <span className={ css( styles.loader ) }></span>
  );
};

const styles = StyleSheet.create({
  loader: {
    top: 0,
    height: 4,
    width: '100%',
    position: 'fixed',
    overflow: 'hidden',
    backgroundColor: '#FFF',
    animationName: {
      '0%': {
        top: '-5%', 
        opacity: 0
      },

      '25%': {
        top: 0,
        opacity: 0.25
      },

      '50%': {
        opacity: 0.5
      },

      '75%': {
        opacity: 0.75
      },
    
      '100%': {
        top: 0,
        opacity: 1
      },
    },
    animationDuration: '1s',
    animationIterationCount: '1',
    animationTimingFunction: 'linear',

    ':before': {
      display: 'block',
      position: 'absolute',
      content: '""',
      left: -200,
      width: '20vw',
      height: 4,
      backgroundColor: colorPallet.alert,
      animationName: {
        'from': {
          left: '-20%', 
        },      
        'to': {
          left: '120%'
        }
      },
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear'
    }
  },
});

// animation: loading 2s linear infinite;

export default Loader;