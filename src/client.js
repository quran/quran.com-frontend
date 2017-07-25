/* global document, window, $ */
import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';

// import browserHistory from 'react-router/lib/browserHistory';
// import useScroll from 'react-router-scroll';
// import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { loadComponents } from 'loadable-components';

import debug from './helpers/debug';

import config from './config';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import Root from './containers/Root';
import createClient from './graphql/client';

const api = new ApiClient();
const client = createClient({ initialState: window.__APOLLO_STATE__ });
console.log(client);
const store = createStore(client, api, window.reduxData);
// const history = syncHistoryWithStore(browserHistory, store);

try {
  Raven.config(config.sentryClient).install();
} catch (error) {
  debug('client', error);
}

window.quranDebug = debug;
window.ReactDOM = ReactDOM; // For chrome dev tool support
window.store = store;

window.clearCookies = () => {
  reactCookie.remove('quran');
  reactCookie.remove('content');
  reactCookie.remove('audio');
  reactCookie.remove('isFirstTime');
  reactCookie.remove('currentLocale');
  reactCookie.remove('smartbanner-closed');
  reactCookie.remove('smartbanner-installed');
};

const mountNode = document.getElementById('app');

loadComponents().then(() => {
  const render = (component, time) => {
    ReactDOM.render(
      <AppContainer>
        {component}
      </AppContainer>,
      mountNode,
      () => {
        debug('client', `React Rendered ${time} time`);
      }
    );
  };

  render(<Root client={client} store={store} />, 'first');

  if (module.hot) {
    debug('client:hot', 'Activated');

    module.hot.accept('./containers/Root', () => {
      debug('client:hot', 'Reload');
      render(<Root client={client} store={store} />, 'second');
    });
  }
});
