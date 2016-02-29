/*global document, window, $ */
require('babel/polyfill');

import ReactDOM from 'react-dom';
import app from './app';
import reactCookie from 'react-cookie';
import createElementWithContext from 'fluxible-addons-react/createElementWithContext';
import debug from 'utils/Debug';

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

debug('client', 'rehydrating app');
// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
    throw err;
  }

  window.context = context;
  const mountNode = document.getElementById('app');

  debug('client', 'React Rendering');
  ReactDOM.render(createElementWithContext(context), mountNode, function () {
    debug('client', 'React Rendered');
  });
});
