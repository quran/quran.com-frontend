/* global document, window, $ */
import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';
import { AppContainer } from 'react-hot-loader';
import { loadComponents } from 'loadable-components';
import 'isomorphic-fetch';

import debug from 'debug';

import config from './config';

import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import Root from './containers/Root';

try {
  Raven.config(config.sentryClient).install();
} catch (error) {
  debug('client', error);
}

window.quranDebug = debug;
window.ReactDOM = ReactDOM; // For chrome dev tool support

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
  const client = new ApiClient();
  const store = createStore(null, client, window.reduxData);

  window.store = store;

  debug('client', 'React Rendering');

  ReactDOM.render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    mountNode,
    () => {
      debug('client', 'React Rendered');
    }
  );

  // if (module.hot) {
  //   module.hot.accept('./containers/Root', () => {
  //     const NextRoot = require('./containers/Root'); // eslint-disable-line global-require

  //     ReactDOM.render(
  //       <AppContainer>
  //         <NextRoot store={store} />
  //       </AppContainer>,
  //       document.getElementById('root')
  //     );
  //   });
  // }
});
