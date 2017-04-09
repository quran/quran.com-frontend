/* eslint-disable max-len, no-console */
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
      <Route path="/donations" getComponent={(nextState, cb) => import('./containers/Donations').then(module => cb(null, module.default)).catch(err => console.trace(err))} />
      <Route path="/contributions" getComponent={(nextState, cb) => import('./containers/Donations').then(module => cb(null, module.default)).catch(err => console.trace(err))} />

      <Route path="/about" getComponent={(nextState, cb) => import('./containers/About').then(module => cb(null, module.default)).catch(err => console.trace(err))} />

      <Route path="/contact" getComponent={(nextState, cb) => import('./containers/Contact').then(module => cb(null, module.default)).catch(err => console.trace(err))} />
      <Route path="/contactus" getComponent={(nextState, cb) => import('./containers/Contact').then(module => cb(null, module.default)).catch(err => console.trace(err))} />

      <Route path="/mobile" getComponent={(nextState, cb) => import('./containers/MobileLanding').then(module => cb(null, module.default)).catch(err => console.trace(err))} />
      <Route path="/apps" getComponent={(nextState, cb) => import('./containers/MobileLanding').then(module => cb(null, module.default)).catch(err => console.trace(err))} />

      <Route path="/error/:errorKey" getComponent={(nextState, cb) => import('./containers/Error').then(module => cb(null, module.default)).catch(err => console.trace(err))} />

      <Route path="/search" getComponent={(nextState, cb) => import('./containers/Search').then(module => cb(null, module.default)).catch(err => console.trace(err))} />

      <Route path="/login" getComponent={(nextState, cb) => import('./containers/Login').then(module => cb(null, module.default)).catch(err => console.trace(err))} />

      <Route onEnter={requireLogin}>
        <Route path="/profile" getComponent={(nextState, cb) => import('./containers/Profile').then(module => cb(null, module.default)).catch(err => console.trace(err))} />
      </Route>

      <Route
        path="/:chapterId/info(/:language)"
        getComponents={
          (nextState, cb) => import('./containers/ChapterInfo').then(module => cb(null, module.default)).catch(err => console.trace(err))
        }
      />

      <Redirect from="/:chapterId:(:range)" to="/:chapterId(/:range)" />

      <Route
        path="/:chapterId(/:range(/:translations))"
        getComponents={(nextState, cb) =>
          Promise.all([
            import('./containers/Surah'),
            import('./components/GlobalNav/Surah')
          ])
          .then(modules => cb(
            null,
            { main: modules[0].default, nav: modules[1].default }
          ))
          .catch(err => console.trace(err))
        }
        onEnter={checkValidSurah}
      />
    </Route>
  );
};
