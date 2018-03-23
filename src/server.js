/* global webpack_isomorphic_tools */
import express from 'express';
// import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import cookie from 'react-cookie';
import Raven from 'raven';
import errorhandler from 'errorhandler';
import pdf from 'html-pdf';
import { ThemeProvider } from 'styled-components';
import { getLoadableState } from 'loadable-components/server';

import config from 'config';
import expressConfig from './server/config/express';
import { routes } from './routes';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import debug from './helpers/debug';
import theme from './theme';

import Html from './helpers/Html';
import PdfHtml from './helpers/PdfHtml';
import App from './containers/App';

import { setOption, setUserAgent } from './redux/actions/options.js';
import getLocalMessages from './helpers/setLocal';

// const pretty = new PrettyError();
const server = express();

Raven.config(config.sentryServer, {
  captureUnhandledRejections: true,
  autoBreadcrumbs: true
}).install();

/* allows us to handle unhandled promises, that might cause node to crash */
process.on('unhandledRejection', (err) => {
  console.log(err);
  debug('Server:unhandledRejection', err);
});

expressConfig(server);

server.use(Raven.requestHandler());

server.use((req, res) => {
  cookie.plugToRequest(req, res);

  const context = {};
  const client = new ApiClient(req);
  const store = createStore(null, client);
  const localMessages = getLocalMessages(req);

  if (process.env.NODE_ENV === 'development') {
    webpack_isomorphic_tools.refresh();
  }

  store.dispatch(setUserAgent(req.useragent));
  store.dispatch(setOption(cookie.load('options') || {}));
  debug('Server', 'Executing navigate action');

  console.log('req.url', req.url);
  routes.forEach((route) => {
    const match = matchPath(req.url, route);

    if (match && route.onEnter) {
      const result = route.onEnter({
        match,
        params: match.params,
        location: {
          pathname: req.url
        }
      });
      console.log('result', result);
      console.log('match', match);

      if (result) {
        return res.status(result.status).redirect(result.url);
      }

      return null;
    }

    return null;
  });

  // inside a request
  const promises = [];
  // use `some` to imitate `<Switch>` behavior of selecting only
  // the first to match
  routes.some((route) => {
    // use `matchPath` here
    const match = matchPath(req.url, route);
    if (match && route.loadData) {
      route.loadData.forEach((connector) => {
        promises.push(
          connector({
            store,
            match,
            params: match.params,
            location: match.location
          })
        );
      });
    }

    return match;
  });

  Promise.all(promises).then(() => {
    const component = (
      <IntlProvider messages={localMessages} locale="en">
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </Provider>
        </ThemeProvider>
      </IntlProvider>
    );

    debug('Server', 'Sending markup');

    if (req.originalUrl.includes('.pdf')) {
      const body = ReactDOM.renderToString(
        <PdfHtml
          url={`${req.protocol}://${req.get('host')}`}
          component={component}
          assets={webpack_isomorphic_tools.assets()}
        />
      );
      const html = `<!doctype html>\n${body}`;

      return pdf.create(html).toStream((err, stream) => {
        if (err) {
          res.status(422).send(err);
        }

        res.set('Content-type', 'application/pdf');
        // NOTE: If you want to export a file.
        // res.set('Content-disposition', 'attachment; filename=pdf.pdf');
        stream.pipe(res);
      });
    }

    return getLoadableState(component).then((loadableState) => {
      const html = `<!doctype html>
      ${ReactDOM.renderToString(
        <Html
          component={component}
          store={store}
          assets={webpack_isomorphic_tools.assets()}
          loadableState={loadableState.getScriptTag()}
        />
      )}`;

      res.type('html');
      res.setHeader('Cache-Control', 'public, max-age=31557600');

      res.status(context.status || 200);

      return res.send(html);
    });
  });

  return false;
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
