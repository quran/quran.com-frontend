import React from 'react';
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {
  AsyncComponentProvider,
  createAsyncContext,
} from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';

import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import {
  ThemeProvider,
  ServerStyleSheet,
  StyleSheetManager,
} from 'styled-components';
import cookie from 'react-cookie';

import getLocalMessages from '../../../helpers/setLocale';
import theme from '../../../theme';
import config from '../../../../config';
import createStore from '../../../redux/createStore';

import ServerHTML from './ServerHTML';
import App from '../../../components/App';
import { setSetting, setUserAgent } from '../../../redux/actions/settings';
import { log } from '../../../../internal/utils';

/**
 * React application middleware, supports server side rendering.
 */
export default function reactApplicationMiddleware(
  request: $TsFixMe,
  response: $TsFixMe
) {
  cookie.plugToRequest(request, response);

  // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }

  const { nonce } = response.locals;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config('disableSSR')) {
    if (process.env.BUILD_FLAG_IS_DEV === 'true') {
      // eslint-disable-next-line no-console
      log({
        title: 'Server',
        level: 'info',
        message: `Handling react route without SSR: ${request.url}`,
      });
    }
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
    const html = renderToStaticMarkup(<ServerHTML nonce={nonce} />);
    response.status(200).send(`<!DOCTYPE html>${html}`);

    return null;
  }

  // Create a context for our AsyncComponentProvider.
  const asyncComponentsContext = createAsyncContext();

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext: $TsFixMe = {};
  const localMessages = getLocalMessages(request);
  const store = createStore({});
  const sheet = new ServerStyleSheet();

  // setup store dispatches
  store.dispatch(setUserAgent(request.useragent));
  store.dispatch(setSetting(cookie.load('options') || {}));

  // Declare our React application.
  const app = (
    <StyleSheetManager sheet={sheet.instance}>
      <AsyncComponentProvider asyncContext={asyncComponentsContext}>
        <IntlProvider locale="en" messages={localMessages}>
          <Provider store={store} key="provider">
            <ThemeProvider theme={theme}>
              <StaticRouter location={request.url} context={reactRouterContext}>
                <App />
              </StaticRouter>
            </ThemeProvider>
          </Provider>
        </IntlProvider>
      </AsyncComponentProvider>
    </StyleSheetManager>
  );

  // Pass our app into the react-async-component helper so that any async
  // components are resolved for the render.
  return asyncBootstrapper(app)
    .then(() => {
      const appString = renderToString(app);
      const styleTags = sheet.getStyleElement();

      // Generate the html response.
      const html = renderToStaticMarkup(
        <ServerHTML
          reactAppString={appString}
          nonce={nonce}
          helmet={Helmet.rewind()}
          asyncComponentsState={asyncComponentsContext.getState()}
          reduxData={store.getState()}
          styleTags={styleTags}
        />
      );

      // Check if the router context contains a redirect, if so we need to set
      // the specific status and redirect header and end the response.
      if (reactRouterContext.url) {
        response.status(302).setHeader('Location', reactRouterContext.url);
        response.end();

        return;
      }

      response
        .status(reactRouterContext.status || 200)
        .send(`<!DOCTYPE html>${html}`);
    })
    .catch((error: $TsFixMe) => console.error(error));
}
