/* eslint-disable max-len, no-console */
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';

import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  hasAccessToken
} from 'redux/actions/auth';

import checkValidSurah from './utils/routeFilters';
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
      <Route
        path="/donations"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "donations" */ './containers/Donations')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />
      <Route
        path="/contributions"
        getComponent={(nextState, cb) =>
          import(
            /* webpackChunkName: "contributions" */ './containers/Donations'
          )
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />

      <Route
        path="/about"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "about" */ './containers/About')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />

      <Route
        path="/contact"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "contact" */ './containers/Contact')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />
      <Route
        path="/contactus"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "contactus" */ './containers/Contact')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />

      <Route
        path="/mobile"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "mobile" */ './containers/MobileLanding')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />
      <Route
        path="/apps"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "apps" */ './containers/MobileLanding')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />

      <Route
        path="/error/:errorKey"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "error" */ './containers/Error')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />

      <Route
        path="/search"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "search" */ './containers/Search')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />

      <Route
        path="/login"
        getComponent={(nextState, cb) =>
          import(/* webpackChunkName: "login" */ './containers/Login')
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />

      <Route onEnter={requireLogin}>
        <Route
          path="/profile"
          getComponent={(nextState, cb) =>
            import(/* webpackChunkName: "profile" */ './containers/Profile')
              .then(module => cb(null, module.default))
              .catch(err => console.trace(err))}
        />
      </Route>

      <Route
        path="/:chapterId/info(/:language)"
        getComponents={(nextState, cb) =>
          import(
            /* webpackChunkName: "chapterinfo" */ './containers/ChapterInfo'
          )
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
        onEnter={checkValidSurah}
      />

      <Route
        path="/ayatul-kursi"
        getComponents={(nextState, cb) =>
          import(
            /* webpackChunkName: "ayatulkursi" */ './containers/AyatulKursi'
          )
            .then(module => cb(null, module.default))
            .catch(err => console.trace(err))}
      />

      <Route
        path="/:chapterId/:range/:translations"
        getComponents={(nextState, cb) =>
          Promise.all([
            import('./containers/Surah'),
            import('./components/GlobalNav/Surah')
          ])
            .then(modules =>
              cb(null, { main: modules[0].default, nav: modules[1].default })
            )
            .catch(err => console.trace(err))}
        onEnter={checkValidSurah}
      />

      <Redirect from="/:chapterId:(:range)" to="/:chapterId(/:range)" />
      <Redirect from="/:chapterId/:from::to" to="/:chapterId/:from-:to" />

      <Route
        path="/:chapterId(/:range).pdf"
        getComponents={(nextState, cb) =>
          import('./containers/Pdf')
            .then(module => cb(null, { main: module.default, nav: 'noscript' }))
            .catch(err => console.trace(err))}
        onEnter={checkValidSurah}
      />

      <Route
        path="/:chapterId(/:range).pdf"
        getComponents={(nextState, cb) =>
          import(/* webpackChunkName: "pdf" */ './containers/Pdf')
            .then(module => cb(null, { main: module.default, nav: 'noscript' }))
            .catch(err => console.trace(err))}
        onEnter={checkValidSurah}
      />

      <Route
        path="/:chapterId(/:range)"
        getComponents={(nextState, cb) =>
          Promise.all([
            import(/* webpackChunkName: "surah" */ './containers/Surah'),
            import(
              /* webpackChunkName: "globalnav-surah" */ './components/GlobalNav/Surah'
            )
          ])
            .then(modules =>
              cb(null, { main: modules[0].default, nav: modules[1].default })
            )
            .catch(err => console.trace(err))}
        onEnter={checkValidSurah}
      />
    </Route>
  );
};
