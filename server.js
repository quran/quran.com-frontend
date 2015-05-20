/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import HtmlComponent from 'components/Html';
import useragent from 'express-useragent';
import * as ExpressActions from 'actions/ExpressActions';
import favicon from 'serve-favicon';

const htmlComponent = React.createFactory(HtmlComponent);
const debug = debugLib('quran-com');
const server = express();

var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 60/*seconds*/});
var ttl = 50;

server.set('state namespace', 'App');
server.set('view cache', true);
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use('/images', express.static(path.join(__dirname, '/client/images')));
server.use('/fonts', express.static(path.join(__dirname, '/client/styles/fonts')));
server.use(useragent.express());
server.use(favicon(__dirname + '/client/images/favicon.ico'));

server.use((req, res, next) => {
    let context = app.createContext();

    debug('Executing navigate action');

    context.getActionContext().executeAction(ExpressActions.userAgent, req.useragent);

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

        debug('Rendering Application component into html');
        // memoryCache.wrap(req.url, function(cacheCallback) {
          const html = React.renderToStaticMarkup(htmlComponent({
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(context.createElement())
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
