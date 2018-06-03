import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Loader from '../ui/shared/Loader';
import Alert from '../ui/shared/Alert';
import { connect } from 'react-redux';
import { removeAlertMessage } from '../../store/actions';

const AppLayout = (props) => {
  return(
    <article 
      className={ css(styles.mainContainer) }>
      { props.isFetching && <Loader /> }

      { props.alerts.length > 0 && 
        <Alert 
          alert={ props.alerts[0] } 
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
    minHeight: 'calc(100vh - 3.5em)',
    margin: '3.25em 0 0 0',
    padding: '0 .5em 0 .5em',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@supports (grid-area: auto)': {
      '@media screen and (min-width: 769px)': {
        display: 'grid',
        gridTemplateColumns: '1fr repeat(4, 10em ) 1fr',
        gridColumnGap: '1em',
      }
    }
  },
});

const mapStateToProps = ( state ) => {
  return { 
    isFetching: state.fetching,
    alerts: state.alerts
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return { 
    handleAlertClick: () => {
      return dispatch( removeAlertMessage( 0 ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);