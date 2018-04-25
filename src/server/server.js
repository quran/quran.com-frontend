/* global webpack_isomorphic_tools */
import express from 'express';
// import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';
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
import { getPromises, checkOnEnterResult } from './routes';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import debug from './helpers/debug';
import theme from './theme';

import Html from './helpers/Html';
import PdfHtml from './helpers/PdfHtml';
import App from './containers/App';

import { setOption, setUserAgent } from './redux/actions/options.js';
import getLocalMessages from './helpers/setLocal';
import { log } from '../internal/utils';

// const pretty = new PrettyError();
const server = express();

Raven.config(config.sentryServer, {
  captureUnhandledRejections: true,
  autoBreadcrumbs: true
}).install();

/* allows us to handle unhandled promises, that might cause node to crash */
process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
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

  store.dispatch(setUserAgent(req.useragent));
  store.dispatch(setOption(cookie.load('options') || {}));
  debug('Server', 'Executing navigate action');

  const result = checkOnEnterResult(req.url);

  if (result) {
    return res.status(result.status).redirect(result.url);
  }

  // inside a request
  const promises = getPromises(req.url, store);

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
          assets={{ styles: {}, javascript: {} }}
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

server.listen(port, () => {
  log({
    title: 'server',
    level: 'special',
    message: `✓

      ${config('welcomeMessage')}

      ${config('htmlPage.defaultTitle')} is ready!

      with

      Service Workers: ${config('serviceWorker.enabled')}
      Polyfills: ${config('polyfillIO.enabled')} (${config(
      'polyfillIO.features'
    ).join(', ')})

      Server is now listening on Port ${config('port')}
      You can access it in the browser at http://${config('host')}:${config(
      'port'
    )}
      Press Ctrl-C to stop.



    `
  });
});
