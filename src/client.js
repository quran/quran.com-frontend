/* global document, window, $ */
import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import useScroll from 'react-router-scroll';
import { ReduxAsyncConnect } from 'redux-connect';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import debug from 'debug';

import config from './config';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import routes from './routes';
import Root from './containers/Root';

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
  }
);
