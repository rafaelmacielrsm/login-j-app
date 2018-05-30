import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

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
    textAlign: 'left'
  },
});

FormLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired
};

export default FormLabel;