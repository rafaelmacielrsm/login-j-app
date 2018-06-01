import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppLayout from '../layout/AppLayout';
import Menu from '../ui/shared/Menu';
import t from '../../config/locales';
import Router from 'next/router';
import { replaceRouteAndCallback } from '../../helpers/routesHelpers';
import { 
  addAuthenticatedUserData,
  cancelFetching,
  addAlertMessage,
  fetchAuthenticatedUser } from '../../store/actions';

// const test = ( callBackAfterRedirect ) => {
//   Router.onRouteChangeComplete = (  ) => {
//     callBackAfterRedirect( t('error.unauthorized'));

//     setTimeout(() => {
//       Router.onRouteChangeComplete = null;
//     }, 1000);
//   };
//   Router.replace('/login');    
// };

class RestrictedResource extends React.Component {
  constructor( state ) {
    super( state );
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  authenticateUser = (  ) => {
    const { name, id } = this.props.userData;
    const { expireAt, token } = this.props.userCredential;
    
    if ( !token || expireAt < Date.now()) {      
      replaceRouteAndCallback( 
        this.props.handleResponseMessage.bind( this ), 
        '/login', 
        t( 'error.unauthorized' )
      );
      
      return;
    }

    if ( !name || !id ) {
      this.props.onAccessHandle( token )
        .then( async (response) => {
          this.props.handleResponseReceived();

          const status = await response.status;
          const jsonObj = await response.json();

          if (status === 200) {
            const { name, id, email, username, resume } = jsonObj.data;
            this.props.handleSuccessFetching({ name, id, email, username, resume });
          }
          
          if ( status === 401 ) {
            replaceRouteAndCallback( 
              this.props.handleResponseMessage.bind( this ), 
              '/login', 
              t( 'error.unauthorized' )
            );      
          }
        })
        .catch(() => {
          this.props.handleResponseMessage( t('error.network'));
        });
    }
  }

  componentDidMount(){
    this.authenticateUser();
  }

  render() {
    return (
      <AppLayout>
        <Menu />
        { this.props.children }
      </AppLayout>
    );
  }
}

RestrictedResource.propTypes = {
  userCredential: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  onAccessHandle: PropTypes.func.isRequired,
  handleResponseMessage: PropTypes.func.isRequired,
  handleResponseReceived: PropTypes.func.isRequired,
  handleSuccessFetching: PropTypes.func.isRequired,
};

const mapStateToProps = ( state ) => ({
  userCredential: state.auth,
  userData: state.userData
});

const mapDispatchToProps = ( dispatch ) => ({
  onAccessHandle: ( userCredential ) => (
    dispatch( fetchAuthenticatedUser( userCredential ))
  ),
  handleResponseMessage:  ( errorMessage, success = false ) => (
    dispatch( addAlertMessage( errorMessage, success ))
  ),
  handleResponseReceived: () => (
    dispatch( cancelFetching() )
  ),
  handleSuccessFetching: ( data ) => (
    dispatch( addAuthenticatedUserData( data ))
  ),
});

export default connect( 
  mapStateToProps, mapDispatchToProps )( RestrictedResource );