import express from 'express';
import expressConfig from 'server/config/express';
const server = express();
expressConfig(server);

import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';

import debugLib from 'debug';
const debug = debugLib('quran');

import app from './app';
import routes from './src/routes';
import ApiClient from './src/helpers/ApiClient';
import createStore from './src/redux/create';
import * as Settings from 'constants/Settings';
import * as ExpressActions from 'actions/ExpressActions';
import * as Fonts from 'utils/FontFace';

import NotFound from 'components/NotFound';
import Errored from 'components/Error';
import ErroredMessage from 'components/ErrorMessage';
import HtmlComponent from 'components/Html';
const htmlComponent = React.createFactory(HtmlComponent);

// Use varnish for the static routes, which will cache too

server.use((req, res, next) => {
  const client = new ApiClient(req);
  const history = createHistory(req.originalUrl);
  const store = createStore(history, client);

  if (process.env.NODE_ENV === 'development') {
    webpack_isomorphic_tools.refresh()
  }

  let context = app.createContext();

  context.getActionContext().executeAction(ExpressActions.userAgent, req.useragent);
  context.getActionContext().executeAction(ExpressActions.cookies, req.cookies);

  debug('Executing navigate action');
  match({ history, routes: routes(), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: { client, context }}).then(() => {

        const component = (
          <Provider store={store} key="provider">
            <RouterContext {...renderProps} createElement={(Component, props) => <Component {...props} context={context.getComponentContext()}/> } />
          </Provider>
        );

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
        debug('Rendering Application component into html');
        const html = ReactDOM.renderToStaticMarkup(htmlComponent({
          context: context.getComponentContext(),
          state: exposed,
          assets: webpack_isomorphic_tools.assets(),
          markup: ReactDOM.renderToString(
            <FluxibleComponent context={context.getComponentContext()}>
              {component}
            </FluxibleComponent>
          ),
          fontFaces: Fonts.createFontFacesArray(context.getComponentContext().getStore('AyahsStore').getAyahs())
        }));

        debug('Sending markup');
        res.type('html');
        res.setHeader('Cache-Control', 'public, max-age=31557600');
        res.status(200).send('<!DOCTYPE html>' + html);
        res.end();
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
