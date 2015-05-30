/*global document, window */
require('babel/polyfill');

import React from 'react';
import debug from 'debug';
import app from './app';

const debugClient = debug('quran-com');
const dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support

// expose debug object to browser, so that it can be enabled/disabled from browser:
// https://github.com/visionmedia/debug#browser-support
window.fluxibleDebug = debug;

debugClient('rehydrating app');

// Init tooltip
if (typeof window !== 'undefined') {
  $(function () {
    $(document.body).tooltip({
      selector: '[data-toggle="tooltip"]',
      animation: false
    });
  });
}

// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    const mountNode = document.getElementById('app');

    debugClient('React Rendering');
    React.render(context.createElement(), mountNode, function () {
        debugClient('React Rendered');
    });
});
