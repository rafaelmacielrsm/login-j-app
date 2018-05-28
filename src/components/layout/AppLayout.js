import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Loader from '../ui/Loader';
import { connect } from 'react-redux';

const AppLayout = (props) => {
  return(
    <article className={ css(styles.mainContainer) }>
      { props.isFetching && <Loader /> }
      { props.children }
    </article>
  );
};

AppLayout.propTypes = {
  isFetching: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100vh',
    margin: '0',
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@supports (grid-area: auto)': {
      '@media screen and (min-width: 2000px)': {
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
    isFetching: state.fetching 
  };
};

export default connect(mapStateToProps)(AppLayout);