/* global document, window, $ */
import React from 'react';
import ReactDOM from 'react-dom';
import reactCookie from 'react-cookie';

import { matchPath } from 'react-router';
// import browserHistory from 'react-router/lib/browserHistory';
// import useScroll from 'react-router-scroll';
// import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { loadComponents } from 'loadable-components';

import debug from './helpers/debug';

import config from './config';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import { routes } from './routes';
import Root from './containers/Root';

const client = new ApiClient();
const store = createStore(client, window.reduxData);
// const history = syncHistoryWithStore(browserHistory, store);

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

const mountNode = document.getElementById('app');

// debug('client', 'React Rendering');

const promises = [loadComponents()];
// use `some` to imitate `<Switch>` behavior of selecting only
// the first to match
routes.some((route) => {
  // use `matchPath` here
  const match = matchPath(window.location.pathname, route);
  if (match && route.loadData) {
    promises.push(...route.loadData.map(loader => loader({ store, match })));
  }

  return match;
});

Promise.all(promises).then(() => {
  const render = (component, time) => {
    ReactDOM.render(
      <AppContainer>
        {component}
      </AppContainer>,
      mountNode,
      () => {
        debug('client', `React Rendered ${time} time`);
      }
    );
  };

  render(<Root store={store} />, 'first');

  if (module.hot) {
    debug('client:hot', 'Activated');

    module.hot.accept('./containers/Root', () => {
      debug('client:hot', 'Reload');
      render(<Root store={store} />, 'second');
    });
  }
});
