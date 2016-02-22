/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import debug from 'debug';
import jquery from 'jquery';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';

import getRoutes from './routes';

jquery(document.body).tooltip({
  selector: '[data-toggle="tooltip"]',
  animation: false
});

const client = new ApiClient();

// Three different types of scroll behavior available.
// Documented here: https://github.com/rackt/scroll-behavior
const scrollHistory = useScroll(() => browserHistory)();

window.quranDebug = debug;

const dest = document.getElementById('content');
const store = createStore(getRoutes, scrollHistory, client, window.__data);
window.__store = store;

const component = (
  <Router
    render={(props) => <ReduxAsyncConnect {...props} helpers={{ client }} />} // eslint-disable-line react/jsx-no-bind
    history={scrollHistory}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf');
  window.React = React; // enable debugger

  if (!dest ||
      !dest.firstChild ||
      !dest.firstChild.attributes ||
      !dest.firstChild.attributes['data-react-checksum']) {
    console.error(
      `Server-side React render was discarded. Make sure that your
      initial render does not contain any client-side code.`
    );
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
