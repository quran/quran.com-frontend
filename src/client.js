/* global document, window, $ */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';
import Provider from 'react-redux/lib/components/Provider';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import useScroll from 'react-router-scroll';
import { ReduxAsyncConnect } from 'redux-connect';
import { syncHistoryWithStore } from 'react-router-redux';
import { IntlProvider } from 'react-intl';

import debug from 'debug';

import config from './config';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import routes from './routes';
import getLocalMessages from './helpers/setLocal';

const client = new ApiClient();
const store = createStore(browserHistory, client, window.reduxData);
const history = syncHistoryWithStore(browserHistory, store);

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

match(
  { history, routes: routes(store) },
  (error, redirectLocation, renderProps) => {
    const component = (
      <Router
        {...renderProps}
        render={props => (
          <ReduxAsyncConnect
            {...props}
            helpers={{ client }}
            render={applyRouterMiddleware(useScroll())}
          />
        )}
      />
    );

    const mountNode = document.getElementById('app');

    debug('client', 'React Rendering');

    ReactDOM.render(
      <IntlProvider locale="en" messages={getLocalMessages()}>
        <Provider store={store} key="provider">
          {component}
        </Provider>
      </IntlProvider>,
      mountNode,
      () => {
        debug('client', 'React Rendered');
      }
    );
  }
);
