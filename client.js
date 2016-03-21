/*global document, window, $ */
require('babel/polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import app from './app';
import reactCookie from 'react-cookie';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import { Router, browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { ReduxAsyncConnect } from 'redux-async-connect';

import debug from 'utils/Debug';

import ApiClient from './src/helpers/ApiClient';
import createStore from './src/redux/create';
import routes from './src/routes';

const client = new ApiClient();
const history = useScroll(() => browserHistory)();
const store = createStore(history, client, window.__data);


const dehydratedState = window.App; // Sent from the server

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;
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
// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }

  window.context = context;
  const mountNode = document.getElementById('app');

  debug('client', 'React Rendering');

  ReactDOM.render(
    <FluxibleComponent context={context.getComponentContext()}>
      {component}
    </FluxibleComponent>, mountNode, () => {
    debug('client', 'React Rendered');
  });
});
