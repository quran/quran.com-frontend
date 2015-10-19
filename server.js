import express from 'express';
import expressConfig from 'server/config/express';
const server = express();
expressConfig(server);

import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import createElementWithContext from 'fluxible-addons-react/createElementWithContext';
import React from 'react';

import debugLib from 'debug';
const debug = debugLib('quran');

import app from './app';
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
  if (process.env.NODE_ENV === 'development') {
    webpack_isomorphic_tools.refresh()
  }

  let context = app.createContext();

  context.getActionContext().executeAction(ExpressActions.userAgent, req.useragent);
  context.getActionContext().executeAction(ExpressActions.cookies, req.cookies);

  debug('Executing navigate action');
  context.getActionContext().executeAction(navigateAction, {
    url: req.url
  }, (err) => {

    if (err) {
      if (err.statusCode && err.statusCode === 404) {
        res.write('<!DOCTYPE html>' + React.renderToStaticMarkup(React.createElement(NotFound)));
        res.end();
      }
      else if (err.message) {
        res.write('<!DOCTYPE html>' + React.renderToStaticMarkup(React.createElement(ErroredMessage, {error: err})));
        res.end();
      }
      else {
        res.write('<!DOCTYPE html>' + React.renderToStaticMarkup(React.createElement(Errored)));
        res.end();
      }
      return;
    }

    debug('Exposing context state');
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    debug('Rendering Application component into html');
    const html = React.renderToStaticMarkup(htmlComponent({
      context: context.getComponentContext(),
      state: exposed,
      assets: webpack_isomorphic_tools.assets(),
      markup: React.renderToString(createElementWithContext(context)),
      fontFaces: Fonts.createFontFacesArray(context.getComponentContext().getStore('AyahsStore').getAyahs())
    }));

    debug('Sending markup');
    res.type('html');
    res.setHeader('Cache-Control', 'public, max-age=31557600');
    res.status(200).send('<!DOCTYPE html>' + html);
    res.end();
  });
});

const port = process.env.PORT || 8000;
server.listen(port);

console.info(`
  ==> 🌎  ENV=${process.env.NODE_ENV}
  ==> ✅  Server is listening at http://localhost:${port}
  ==> 🎯  API at ${Settings.api}
`);

export default server;
