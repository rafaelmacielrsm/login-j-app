import { initializeStore } from '../store/store';
import React from 'react';

const isServer = typeof windows === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore( initialState ) {
  if (isServer) {
    return initializeStore( initialState );
  }

  if ( !window[ __NEXT_REDUX_STORE__ ]) {
    window[ __NEXT_REDUX_STORE__ ] = initializeStore(initialState);
  }

  return window[ __NEXT_REDUX_STORE__ ];
}

export default (App) => {
  return class Redux extends React.Component {
    static async getInitialProps (appContext) {
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
