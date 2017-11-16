/* global document, window, $ */
import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';

import debug from 'debug';

import config from './config';
import theme from './theme';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import Root from './containers/Root';
import App from './containers/App';

const client = new ApiClient();
const store = createStore(null, client, window.reduxData);

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

const component = (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

const mountNode = document.getElementById('app');

debug('client', 'React Rendering');

ReactDOM.render(
  <AppContainer>
    <Root component={component} store={store} />
  </AppContainer>,
  mountNode,
  () => {
    debug('client', 'React Rendered');
  }
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require

    ReactDOM.render(
      <AppContainer>
        <NextRoot store={store} component={component} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
