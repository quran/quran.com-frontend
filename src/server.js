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
import expressConfig from './server/config/express';

const pretty = new PrettyError();
const server = express();

expressConfig(server);

import routes from './routes';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import debug from './helpers/debug';

import Html from './helpers/Html';

import { setUserAgent } from './redux/actions/audioplayer.js';
import { setOption } from './redux/actions/options.js';

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
  match({ history, routes: routes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    debug('Server', 'Route match callback');


    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500).send(error);
    } else if (renderProps) {

      const status = renderProps.location.pathname.indexOf('/error') > -1 ? 404 : 200;

      loadOnServer({...renderProps, store, helpers: { client }}).then(() => {
        const component = (
          <Provider store={store}>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.type('html');
        res.setHeader('Cache-Control', 'public, max-age=31557600');
        res.status(status);
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
