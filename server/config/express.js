import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import errorhandler from 'errorhandler';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from './environment';

export default function(server) {
  server.use(compression());
  server.use(bodyParser.json());
  server.use(logger('dev'));
  server.use(useragent.express());
  server.use(cookieParser());
  server.use(cors());

  // Static content
  server.use(favicon(process.env.PWD + '/static/images/favicon.ico'));
  server.use('/public', express.static(path.join(process.env.PWD, '/build')));
  server.use('/build', express.static(path.join(process.env.PWD, '/build')));

  server.set('state namespace', 'App');
  server.set('view cache', true);

  require('../routes')(server);

  server.use(errorhandler()); // Must be last!
}
