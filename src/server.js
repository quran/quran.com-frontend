/* global webpack_isomorphic_tools */
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { IntlProvider } from 'react-intl';
import cookie from 'react-cookie';
import Raven from 'raven';
import errorhandler from 'errorhandler';
import { StaticRouter } from 'react-router';
import { getLoadableState } from 'loadable-components/server';

import config from 'config';
import expressConfig from './server/config/express';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import debug from './helpers/debug';

import Html from './helpers/Html';
import App from './containers/App';

import { setOption, setUserAgent } from './redux/actions/options.js';
import createClient from './graphql/client';

import getLocalMessages from './helpers/setLocal';

const server = express();
Raven.config(config.sentryServer, {
  captureUnhandledRejections: true,
  autoBreadcrumbs: true
}).install();

expressConfig(server);

server.use(Raven.requestHandler());

server.use((req, res) => {
  cookie.plugToRequest(req, res);
  const api = new ApiClient(req);
  const client = createClient({ ssrMode: true });
  // const history = createHistory(req.originalUrl);
  const store = createStore(client, api);
  const localMessages = getLocalMessages(req);

  if (process.env.NODE_ENV === 'development') {
    webpack_isomorphic_tools.refresh();
  }

  if (req.query.DISABLE_SSR) {
    return res.status(200).send(
      `<!doctype html>\n${ReactDOM.renderToString(<IntlProvider locale="en" messages={localMessages}>
        <Html store={store} assets={webpack_isomorphic_tools.assets()} />
      </IntlProvider>)}`
    );
  }

  store.dispatch(setUserAgent(req.useragent));
  store.dispatch(setOption(cookie.load('options') || {}));
  debug('Server', 'Executing navigate action');

  const context = {};

  const component = (
    <IntlProvider messages={localMessages} locale="en">
      <ApolloProvider store={store} client={client}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </IntlProvider>
  );

  return getLoadableState(component)
    .then((loadableState) => {
      renderToStringWithData(component)
        .then((content) => {
          const initialState = {
            [client.reduxRootKey || 'apollo']: client.getInitialState()
          };
          const body = ReactDOM.renderToString(
            <Html
              component={content}
              apollo={initialState}
              store={store}
              assets={webpack_isomorphic_tools.assets()}
              state={loadableState.getScriptTag()}
            />
          );

          const html = `<!doctype html>${body}`;
          res.send(html);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

server.use(Raven.errorHandler());

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
  return server.listen(port, () => {
    console.info(`==> 🌎  ENV=${process.env.NODE_ENV}`);
    console.info(`==> ✅  Server is listening at http://localhost:${port}`);
    console.info(`==> 🎯  API at ${process.env.API_URL}`);
    Object.keys(config).forEach(
      key =>
        config[key].constructor.name !== 'Object' &&
        console.info(`==> ${key}`, config[key])
    );

    return cb && cb(this);
  });
}
