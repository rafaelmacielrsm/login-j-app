import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

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
    ':before': {
      display: 'block',
      position: 'absolute',
      content: '""',
      left: -200,
      width: '20vw',
      height: 4,
      backgroundColor: '#F00',
      animationName: {
        'from': {
          left: '-20%', 
        },
      
        '50%': {
          left: '50%'
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