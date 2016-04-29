/*global document, window, $ */
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { ReduxAsyncConnect } from 'redux-async-connect';

import debug from 'debug';

import ApiClient from './src/helpers/ApiClient';
import createStore from './src/redux/create';
import routes from './src/routes';

const client = new ApiClient();
const history = useScroll(() => browserHistory)();
const store = createStore(history, client, window.__data);

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
  <Router render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{client}} />
      } history={history}>
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
