import express from 'express';
import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import cookie from 'react-cookie';
import raven from 'raven';
import errorhandler from 'errorhandler';

import config from 'config';
import expressConfig from 'server/config/express';

const pretty = new PrettyError();
const server = express();

expressConfig(server);

import routes from './src/routes';
import ApiClient from './src/helpers/ApiClient';
import createStore from './src/redux/create';
import debug from './src/helpers/debug';

import Html from './src/helpers/Html';

import { setUserAgent } from './src/redux/actions/AudioPlayerActions.js';
import { setOption } from './src/redux/actions/OptionsActions.js';

// Use varnish for the static routes, which will cache too
server.use(raven.middleware.express.requestHandler(config.sentryServer));

server.use((req, res, next) => {
  cookie.plugToRequest(req, res);
  const client = new ApiClient(req);
  const history = createHistory(req.originalUrl);
  const store = createStore(history, client);

  if (process.env.NODE_ENV === 'development') {
    webpack_isomorphic_tools.refresh()
  }

  if (req.query.DISABLE_SSR) {
    return res.status(200).send('<!doctype html>\n' + ReactDOM.renderToString(
      <Html
        store={store}
        assets={webpack_isomorphic_tools.assets()}
      />
    ));
  }

  store.dispatch(setUserAgent(req.useragent));
  store.dispatch(setOption(cookie.load('options') || {}));
  debug('Server', 'Executing navigate action');
  match({ history, routes: routes(), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    debug('Server', 'Route match callback');

    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500).send(error);
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: { client }}).then(() => {
        const component = (
          <Provider store={store}>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.type('html');
        res.setHeader('Cache-Control', 'public, max-age=31557600');
        res.status(200);
        debug('Server', 'Sending markup');
        res.send('<!doctype html>\n' + ReactDOM.renderToString(
          <Html
            component={component}
            store={store}
            assets={webpack_isomorphic_tools.assets()}
          />
        ));
      }).catch(next);
    }
  });
});

server.use(raven.middleware.express.errorHandler(config.sentryServer));

if (process.env.NODE_ENV === 'development') {
  // only use in development
  server.use(errorhandler());
} else {
  server.use((req, res) => {
    res.status(500);
    res.send('OOPS');
  });
}

const port = process.env.PORT || 8000;

export default function serve(cb) {
  return server.listen(port, function() {
    console.info(`==> 🌎  ENV=${process.env.NODE_ENV}`);
    console.info(`==> ✅  Server is listening at http://localhost:${port}`);
    console.info(`==> 🎯  API at ${process.env.API_URL}`);
    Object.keys(config).forEach(key => config[key].constructor.name !== 'Object' && console.info(`==> ${key}`, config[key]));

    cb && cb(this);
  });
};
