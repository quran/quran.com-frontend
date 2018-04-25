import React from 'react';
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {
  AsyncComponentProvider,
  createAsyncContext
} from 'react-async-component';
import Provider from 'react-redux/lib/components/Provider';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import cookie from 'react-cookie';

import getLocalMessages from '../../../shared/helpers/setLocal';
import theme from '../../../shared/theme';
import config from '../../../../config';
import ApiClient from '../../../shared/helpers/ApiClient';
import createStore from '../../../shared/redux/create';

import ServerHTML from './ServerHTML';
import App from '../../../shared/containers/App';
import {
  setOption,
  setUserAgent
} from '../../../shared/redux/actions/options.js';
import { getPromises, checkOnEnterResult } from '../../../shared/routes';
import { log } from '../../../../internal/utils';

/**
 * React application middleware, supports server side rendering.
 */
export default function reactApplicationMiddleware(request, response) {
  cookie.plugToRequest(request, response);

  const result = checkOnEnterResult(request.url);

  if (result) {
    return response.status(result.status).redirect(result.url);
  }

  // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }

  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config('disableSSR')) {
    if (process.env.BUILD_FLAG_IS_DEV === 'true') {
      // eslint-disable-next-line no-console
      log({
        title: 'Server',
        level: 'info',
        message: `Handling react route without SSR: ${request.url}`
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
  const reactRouterContext = {};
  const localMessages = getLocalMessages(request);
  const client = new ApiClient(request);
  const store = createStore(null, client);

  // setup store dispatches
  store.dispatch(setUserAgent(request.useragent));
  store.dispatch(setOption(cookie.load('options') || {}));

  // Declare our React application.
  const app = (
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
  );

  // Pass our app into the react-async-component helper so that any async
  // components are resolved for the render.
  // TODO: use bootstrapper
  // asyncBootstrapper(app).then(() => {

  // inside a request
  const promises = getPromises(request.url, store);

  return Promise.all(promises)
    .then(() => {
      const appString = renderToString(app);

      // Generate the html response.
      const html = renderToStaticMarkup(
        <ServerHTML
          reactAppString={appString}
          nonce={nonce}
          helmet={Helmet.rewind()}
          asyncComponentsState={asyncComponentsContext.getState()}
          reduxData={store.getState()}
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
    .catch(error => console.error(error));
}
