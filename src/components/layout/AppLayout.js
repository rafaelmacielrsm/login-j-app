import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Loader from '../ui/shared/Loader';
import Alert from '../ui/shared/Alert';
import { connect } from 'react-redux';
import { removeErrorMessage } from '../../store/actions';

const AppLayout = (props) => {
  return(
    <article 
      className={ css(styles.mainContainer) }>
      { props.isFetching && <Loader /> }

      { props.errors.length > 0 && 
        <Alert 
          message={ props.errors[0] } 
          handleClick={ props.handleAlertClick }/> }

      { props.children }
    </article>
  );
};

AppLayout.propTypes = {
  isFetching: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  mainContainer: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    color: 'white',
    width: '100%',
    height: '100vh',
    margin: '0',
    padding: '0 1em 0 1em',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@supports (grid-area: auto)': {
      '@media screen and (min-width: 5000px)': {
        display: 'grid',
        gridTemplateColumns: '1fr repeat(4, calc(90%/6) ) 1fr',
        gridColumnGap: 'calc(10%/5)',
        backgroundColor: 'gray'
      }
    }
  },
});

const mapStateToProps = ( state ) => {
  return { 
    isFetching: state.fetching,
    errors: state.errors
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return { 
    handleAlertClick: () => {
      return dispatch( removeErrorMessage( 0 ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);