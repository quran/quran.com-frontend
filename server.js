import express from 'express';
import expressConfig from 'server/config/express';
const server = express();
expressConfig(server);

import {navigateAction} from 'fluxible-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import cookie from 'react-cookie';

import debugLib from 'debug';
const debug = debugLib('quran');

import routes from './src/routes';
import ApiClient from './src/helpers/ApiClient';
import createStore from './src/redux/create';
import * as Settings from 'constants/Settings';

import NotFound from 'components/NotFound';
import Errored from 'components/Error';
import ErroredMessage from 'components/ErrorMessage';
import Html from 'components/Html';

import { setUserAgent } from './src/redux/modules/audioplayer';
import { setOption } from './src/redux/modules/options';

// Use varnish for the static routes, which will cache too

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

  debug('Executing navigate action');
  match({ history, routes: routes(), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: { client }}).then(() => {
        const component = ReactDOM.renderToString(
          <Provider store={store}>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        debug('Rendering Application component into html');
        debug('Sending markup');
        res.type('html');
        res.setHeader('Cache-Control', 'public, max-age=31557600');
        res.status(200).send('<!doctype html>\n' + ReactDOM.renderToString(
          <Html
            component={component}
            store={store}
            assets={webpack_isomorphic_tools.assets()}
          />
        ));
      });
    }
  });
});

const port = process.env.PORT || 8000;

export default function serve(cb) {
  return server.listen(port, function() {
    console.info(`
      ==> 🌎  ENV=${process.env.NODE_ENV}
      ==> ✅  Server is listening at http://localhost:${port}
      ==> 🎯  API at ${Settings.api}
    `);

    cb && cb(this);
  });
};
