/*global document, window, $ */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';
import Provider from 'react-redux/lib/components/Provider';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import useScroll from 'react-router-scroll';
import { ReduxAsyncConnect } from 'redux-connect';
import { syncHistoryWithStore } from 'react-router-redux';

import debug from 'debug';

import ApiClient from './src/helpers/ApiClient';
import createStore from './src/redux/create';
import routes from './src/routes';

const client = new ApiClient();
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

window.quranDebug = debug;
window.ReactDOM = ReactDOM; // For chrome dev tool support

window.clearCookies = function() {
  reactCookie.remove('quran');
  reactCookie.remove('content');
  reactCookie.remove('audio');
  reactCookie.remove('isFirstTime');
};

// Init tooltip
if (typeof window !== 'undefined') {
  $(function () {
    $(document.body).tooltip({
      selector: '[data-toggle="tooltip"]',
      animation: false
    });
  });
}

const component = (
  <Router
    history={history}
    render={(props) => (
      <ReduxAsyncConnect
        {...props}
        helpers={{client}}
        filter={item => !item.deferred}
        render={applyRouterMiddleware(useScroll())}
      />
    )}
  >
    {routes()}
  </Router>
);

debug('client', 'rehydrating app');

const mountNode = document.getElementById('app');

debug('client', 'React Rendering');

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>, mountNode, () => {
  debug('client', 'React Rendered');
});
