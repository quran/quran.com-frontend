import express from 'express';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import createElementWithContext from 'fluxible-addons-react/createElementWithContext';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import request from 'utils/Request';
import * as Settings from 'constants/Settings';

import favicon from 'serve-favicon';
import * as ExpressActions from 'actions/ExpressActions';

import * as Fonts from 'utils/FontFace';

import NotFound from 'components/NotFound';
import Errored from 'components/Error';
import ErroredMessage from 'components/ErrorMessage';
import HtmlComponent from 'components/Html';
const htmlComponent = React.createFactory(HtmlComponent);
const debug = debugLib('quran-com');
const server = express();

import Logger from 'le_node';
let logger = new Logger({
  token:'bf07a2f4-0b1a-4645-8c1d-de41742b6abb'
});

server.set('state namespace', 'App');
server.set('view cache', true);
// Use varnish for the static routes, which will cache too
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use('/build', express.static(path.join(__dirname, '/build')));
server.use(useragent.express());
server.use(cookieParser());
server.use(favicon(__dirname + '/static/images/favicon.ico'));

server.get('/api/*', function(req, res, next) {
  request.get(Settings.api + req.url.split('/api')[1])
  .end(function(err, response) {
    res.send(response.body);
  });
});

server.get(/^\/(images|fonts)\/.*/, function(req, res) {
  res.redirect(301, '//quran-1f14.kxcdn.com' + req.path);
});

server.use((req, res, next) => {

    let context = app.createContext();

    context.getActionContext().executeAction(ExpressActions.userAgent, req.useragent);
    context.getActionContext().executeAction(ExpressActions.cookies, req.cookies);

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
      }, (err) => {

        if (err) {
          logger.log('err', {Error: err, Request: req.url, Cookies: req.cookies, Stack: err.stack});

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
        const webserver = process.env.NODE_ENV === "production" ? "" : "//localhost:8080";

        debug('Rendering Application component into html');
        const html = React.renderToStaticMarkup(htmlComponent({
          context: context.getComponentContext(),
          state: exposed,
          markup: React.renderToString(createElementWithContext(context)),
          fontFaces: Fonts.createFontFacesArray(context.getComponentContext().getStore('AyahsStore').getAyahs()),
          hotModuleUrl: `${webserver}/`
        }));

        debug('Sending markup');
        res.type('html');
        res.setHeader('Cache-Control', 'public, max-age=31557600');
        res.write('<!DOCTYPE html>' + html);
        res.end();
      });
});


const port = process.env.PORT || 8000;
server.listen(port);
console.log(`Frontend app started at port: ${port} and backend url: ${Settings.url}`);
export default server;
