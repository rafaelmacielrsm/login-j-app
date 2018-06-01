import Router from 'next/router';

export const replaceRouteAndCallback = ( callback, url, ...args ) => {
  Router.onRouteChangeComplete = ( ) => {
    callback( args );

    setTimeout(() => {
      Router.onRouteChangeComplete = null;
    }, 1000);
  };
  Router.replace( url );    
};