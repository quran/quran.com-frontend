/* eslint-disable max-len */
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';

import { isLoaded as isAuthLoaded, load as loadAuth, hasAccessToken } from 'redux/actions/auth';

import checkValidSurah from './utils/checkValidSurah';
import App from './containers/App';
import Home from './containers/Home';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const shouldAuth = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState()) && hasAccessToken()) {
      return store.dispatch(loadAuth()).then(() => cb());
    }

    return cb();
  };

  return (
    <Route path="/" component={App} onEnter={shouldAuth}>
      <IndexRoute components={Home} />
      <Route path="/donations" getComponent={(nextState, cb) => System.import('./containers/Donations').then(module => cb(null, module))} />
      <Route path="/contributions" getComponent={(nextState, cb) => System.import('./containers/Donations').then(module => cb(null, module))} />

      <Route path="/about" getComponent={(nextState, cb) => System.import('./containers/About').then(module => cb(null, module))} />

      <Route path="/contact" getComponent={(nextState, cb) => System.import('./containers/Contact').then(module => cb(null, module))} />
      <Route path="/contactus" getComponent={(nextState, cb) => System.import('./containers/Contact').then(module => cb(null, module))} />

      <Route path="/mobile" getComponent={(nextState, cb) => System.import('./containers/MobileLanding').then(module => cb(null, module))} />
      <Route path="/apps" getComponent={(nextState, cb) => System.import('./containers/MobileLanding').then(module => cb(null, module))} />

      <Route path="/error/:errorKey" getComponent={(nextState, cb) => System.import('./containers/Error').then(module => cb(null, module))} />

      <Route path="/search" getComponent={(nextState, cb) => System.import('./containers/Search').then(module => cb(null, module))} />

      <Route path="/login" getComponent={(nextState, cb) => System.import('./containers/Login').then(module => cb(null, module))} />

      <Route onEnter={requireLogin}>
        <Route path="/profile" getComponent={(nextState, cb) => System.import('./containers/Profile').then(module => cb(null, module))} />
      </Route>

      <Redirect from="/:surahId:(:range)" to="/:surahId(/:range)" />

      <Route
        path="/:surahId(/:range)"
        getComponents={(nextState, cb) =>
          Promise.all([
            System.import('./containers/Surah'),
            System.import('./components/GlobalNav/Surah'),
            System.import('./components/GlobalSidebar/Surah'),
          ])
          .then((module, GlobalNavSurah, GlobalSidebarSurah) => cb(
            null,
            { main: module, nav: GlobalNavSurah, sidebar: GlobalSidebarSurah }
          ))
          .catch(err => console.trace(err))
        }
        onEnter={checkValidSurah}
      />
    </Route>
  );
};
