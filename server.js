import express from 'express';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';

import favicon from 'serve-favicon';
import * as ExpressActions from 'actions/ExpressActions';

import * as Fonts from 'utils/FontFace';

import HtmlComponent from 'components/Html';
const htmlComponent = React.createFactory(HtmlComponent);
const debug = debugLib('quran-com');
const server = express();

var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 60/*seconds*/});
var ttl = 50;

server.set('state namespace', 'App');
server.set('view cache', true);
// Use varnish for the static routes, which will cache too
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use('/build', express.static(path.join(__dirname, '/build')));
server.use('/static', express.static(path.join(__dirname, '/static')));
server.use('/images', express.static(path.join(__dirname, '/static/images')));
server.use('/fonts', express.static(path.join(__dirname, '/src/styles/fonts')));
server.use(useragent.express());
server.use(cookieParser());
server.use(favicon(__dirname + '/static/images/favicon.ico'));

server.use((req, res, next) => {
    let context = app.createContext();

    debug('Executing navigate action');

    context.getActionContext().executeAction(ExpressActions.userAgent, req.useragent);
    context.getActionContext().executeAction(ExpressActions.cookies, req.cookies);

    context.getActionContext().executeAction(navigateAction, {
        url: req.url
      }, (err) => {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
        const webserver = process.env.NODE_ENV === "production" ? "" : "//localhost:8080";

        debug('Rendering Application component into html');
        // memoryCache.wrap(req.url, function(cacheCallback) {
          const html = React.renderToStaticMarkup(htmlComponent({
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(context.createElement()),
            fontFaces: Fonts.createFontFacesArray(context.getComponentContext().getStore('AyahsStore').getAyahs()),
            hotModuleUrl: `${webserver}/`
          }));

          // cacheCallback(null, html)
        // }, ttl, function(err, html) {
          debug('Sending markup');
          res.type('html');
          res.setHeader('Cache-Control', 'public, max-age=31557600');
          res.write('<!DOCTYPE html>' + html);
          res.end();
        // });
      });
});

const port = process.env.PORT || 8000;
server.listen(port);
console.log('Listening on port ' + port);

export default server;
