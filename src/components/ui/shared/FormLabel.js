import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { fluidValue } from '../assets/common';

const FormLabel = ({ htmlFor, ...props }) => (
  <label 
    className={ css( styles.labelForm ) } 
    htmlFor={ htmlFor }>
  
    { props.children }
  </label>
);

const styles = StyleSheet.create({
  labelForm: {
    margin: 0,
    padding: 0,
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    '@media screen and (min-width: 320px)':{
      fontSize: fluidValue(16,20),
    },
    '@media screen and (min-width: 768px)':{
      fontSize: 20,
    },    
  },
});

FormLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired
};

export default FormLabel;