/* global webpack_isomorphic_tools */
import express from 'express';
import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  ApolloClient,
  ApolloProvider,
  renderToStringWithData
} from 'react-apollo';
import { IntlProvider } from 'react-intl';
import cookie from 'react-cookie';
import Raven from 'raven';
import errorhandler from 'errorhandler';
import pdf from 'html-pdf';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';

import config from 'config';
import expressConfig from './server/config/express';
import { routes } from './routes';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import debug from './helpers/debug';

import Html from './helpers/Html';
import PdfHtml from './helpers/PdfHtml';
import App from './containers/App';

import { setOption, setUserAgent } from './redux/actions/options.js';
import createClient from './graphql/client';

import getLocalMessages from './helpers/setLocal';

const pretty = new PrettyError();
const server = express();
Raven.config(config.sentryServer, {
  captureUnhandledRejections: true,
  autoBreadcrumbs: true
}).install();

expressConfig(server);

server.use(Raven.requestHandler());

server.use((req, res, next) => {
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

  // inside a request
  // const promises = [];
  const context = {};
  // // use `some` to imitate `<Switch>` behavior of selecting only
  // // the first to match
  // routes.some((route) => {
  //   // use `matchPath` here
  //   const match = matchPath(req.path, route);
  //   if (match && route.loadData) {
  //     promises.push(
  //       ...route.loadData.map(loader =>
  //         loader({ store, location: { query: req.query }, ...match })
  //       )
  //     );
  //   }
  //   console.log(match);
  //   return match;
  // });

  // Promise.all(promises)
  //   .then((data) => {
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
    .then(loadableState => {
      renderToStringWithData(component)
        .then(content => {
          const initialState = {
            [client.reduxRootKey || 'apollo']: client.getInitialState()
          };

          console.log(client);

          const html = `<!doctype html>
              ${ReactDOM.renderToString(<Html component={content} apollo={initialState} store={store} assets={webpack_isomorphic_tools.assets()} state={loadableState.getScriptTag()} />)}
          `;
          res.send(html);
        })
        .catch(error => {
          console.log(error);
          res.send(error);
        });
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

// match(
//   { history, routes: routes(store), location: req.originalUrl },
//   (error, redirectLocation, renderProps) => {
//     debug('Server', 'Route match callback');

//     if (redirectLocation) {
//       res.redirect(redirectLocation.pathname + redirectLocation.search);
//     } else if (error) {
//       console.error('ROUTER ERROR:', pretty.render(error));
//       res.status(500).send(error);
//     } else if (renderProps) {
//       const status = renderProps.location.pathname.indexOf('/error') > -1
//         ? 404
//         : 200;

//       loadOnServer({ ...renderProps, store, helpers: { client } })
//         .then(() => {
//           const component = (
//             <IntlProvider messages={localMessages} locale="en">
//               <Provider store={store}>
//                 <ReduxAsyncConnect {...renderProps} />
//               </Provider>
//             </IntlProvider>
//           );

//           res.type('html');
//           res.setHeader('Cache-Control', 'public, max-age=31557600');
//           res.status(status);
//           debug('Server', 'Sending markup');

//           if (req.originalUrl.includes('.pdf')) {
//             const body = ReactDOM.renderToString(
//               <PdfHtml
//                 url={`${req.protocol}://${req.get('host')}`}
//                 component={component}
//                 assets={webpack_isomorphic_tools.assets()}
//               />
//             );
//             const html = `<!doctype html>\n${body}`;

//             return pdf.create(html).toStream((err, stream) => {
//               if (err) {
//                 res.status(422).send(err);
//               }

//               res.set('Content-type', 'application/pdf');
//               // NOTE: If you want to export a file.
//               // res.set('Content-disposition', 'attachment; filename=pdf.pdf');
//               stream.pipe(res);
//             });
//           }

//           const html = `<!doctype html>
//           ${ReactDOM.renderToString(<Html component={component} store={store} assets={webpack_isomorphic_tools.assets()} />)}`;

//           return res.send(html);
//         })
//         .catch(next);
//     }
//   }
// );

//   return false;
// });

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
