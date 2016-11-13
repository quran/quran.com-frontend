import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import httpProxy from 'http-proxy';

import sitemap from './sitemap';
import support from './support';

const proxyApi = httpProxy.createProxyServer({
  target: process.env.API_URL,
  secure: true
});

const proxyOneQuran = httpProxy.createProxyServer({
  target: process.env.ONE_QURAN_URL,
  secure: true
});

proxyApi.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

export default function(server) {
  server.use(compression());
  server.use(bodyParser.json());
  server.use(logger('dev'));
  server.use(useragent.express());
  server.use(cookieParser());
  server.use(cors());

  // Static content
  server.use(favicon(path.join((process.env.PWD || process.env.pm_cwd) , '/static/images/favicon.ico')));
  server.use(express.static(path.join(process.env.PWD || process.env.pm_cwd, '/static')));
  server.use('/public', express.static(path.join((process.env.PWD || process.env.pm_cwd), '/static/dist')));
  // server.use('/build', express.static(path.join((process.env.PWD || process.env.pm_cwd), '/static/dist')));

  sitemap(server);
  support(server);

  server.get(/^\/(images|fonts)\/.*/, function(req, res) {
    res.redirect(301, '//quran-1f14.kxcdn.com' + req.path);
  });

  server.use('/api/onequran', (req, res) => {
    proxyOneQuran.web(req, res);
  });

  server.use('/api', (req, res) => {
    proxyApi.web(req, res);
  });
}
