import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './components/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import logger from 'morgan';
import SocketIo from 'socket.io';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';

import {ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'qs';

import getRoutes from './routes';
import getStatusFromRoutes from './helpers/getStatusFromRoutes';
import proxySetup from './helpers/proxySetup';

import { setUserAgent } from 'redux/modules/audioplayer';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static/images', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(logger('dev'));
app.use(useragent.express());
app.use(cookieParser());
app.set('view cache', true);

// Proxy to API server
proxySetup(app);

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);

  const store = createStore(reduxReactRouter, getRoutes, createHistory, client);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  store.dispatch(setUserAgent(req.useragent));

  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (!routerState) {
      res.status(500);
      hydrateOnClient();
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search.slice(1));
      }

      store.getState().router.then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter/>
          </Provider>
        );

        const status = getStatusFromRoutes(routerState.routes);
        if (status) {
          res.status(status);
        }
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      }).catch((err) => {
        console.error('DATA FETCHING ERROR:', pretty.render(err));
        res.status(500);
        hydrateOnClient();
      });
    }
  }));
});

if (config.port) {
  if (config.isProduction) {
    const io = new SocketIo(server);
    io.path('/api/ws');
  }
  export default function(cb) {
    return server.listen(config.port, (err) => {
      if (err) {
        console.error(err);
      }
      console.info('----\n==> ✅ Server is running, talking to API server on %s.', config.apiUrl);
      console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
      cb && cb(server);
    });
  }
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
