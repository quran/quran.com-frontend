/* global document, window */
/* eslint-disable global-require */
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';
import { AsyncComponentProvider } from 'react-async-component';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import asyncBootstrapper from 'react-async-bootstrapper';
import ReactHotLoader from './components/ReactHotLoader';
import getLocalMessages from '../helpers/setLocale';
import App from '../components/App';
import theme from '../theme';

import '../styles/main.global.scss';
import config from '../../config';

import createStore from '../redux/createStore';

try {
  if (window.Raven) {
    window.Raven.config(config('sentryClient')).install();
  }
} catch (error) {
  console.log('client', error);
}

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
// eslint-disable-next-line no-underscore-dangle
const store = createStore(window.__REDUX_DATA__);

window.store = store;

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;

// Get any rehydrateState for the async components.
// eslint-disable-next-line no-underscore-dangle
const asyncComponentsRehydrateState =
  // eslint-disable-next-line no-underscore-dangle
  window.__ASYNC_COMPONENTS_REHYDRATE_STATE__;

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp: $TsFixMe) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (
    <ReactHotLoader>
      <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
        <IntlProvider locale="en" messages={getLocalMessages()}>
          <Provider store={store} key="provider">
            <ThemeProvider theme={theme}>
              <BrowserRouter forceRefresh={!supportsHistory}>
                <TheApp />
              </BrowserRouter>
            </ThemeProvider>
          </Provider>
        </IntlProvider>
      </AsyncComponentProvider>
    </ReactHotLoader>
  );

  // We use the react-async-component in order to support code splitting of
  // our bundle output. It's important to use this helper.
  // @see https://github.com/ctrlplusb/react-async-component
  asyncBootstrapper(app).then(() => {
    ReactDOM.render(app, mountNode, () => {
      console.log('client', 'React Rendered');
    });
  });
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && (module as $TsFixMe).hot) {
  // Accept changes to this file for hot reloading.
  (module as $TsFixMe).hot.accept('./index.tsx');
  // Any changes to our App will cause a hotload re-render.
  (module as $TsFixMe).hot.accept('../components/App', () => {
    renderApp(require('../components/App').default);
  });
}
