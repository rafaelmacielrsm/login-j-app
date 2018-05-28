import App, {Container} from 'next/app';
import React from 'react';
import withReduxStore from '../src/lib/with-redux-store';
import { Provider } from 'react-redux';

const saveState = () => {
  /* eslint-disable no-undef */
  const state = JSON.stringify(__NEXT_REDUX_STORE__.getState());
  localStorage['redux-store'] = state;
  /* eslint-enable no-undef */
};


class MyApp extends App {
  render () {
    const {Component, pageProps, reduxStore, router} = this.props;
    reduxStore.subscribe(saveState);
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} router={router} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);