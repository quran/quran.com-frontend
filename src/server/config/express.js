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
import fs from 'fs';

import support from './support';

const proxyApi = httpProxy.createProxyServer({
  target: process.env.API_URL,
  secure: true
});

const proxyOneQuran = httpProxy.createProxyServer({
  target: process.env.ONE_QURAN_URL,
  secure: false,
  proxyTimeout: 15000,
  autoRewrite: true,
  changeOrigin: true
});

proxyApi.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error); // eslint-disable-line
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

proxyOneQuran.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error); // eslint-disable-line
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

export default (server) => {
  server.use(logger('dev'));
  // Must be first thing. See: https://github.com/nodejitsu/node-http-proxy/issues/180#issuecomment-3677221
  server.use('/onequran', (req, res) => {
    proxyOneQuran.web(req, res);
  });

  server.use('/apple-app-site-association', (req, res) => {
    const siteAssociation = fs.readFileSync(
      `${__dirname}/apple-app-site-association.json`
    );
    res.set('Content-Type', 'application/pkcs7-mime');
    res.status(200).send(siteAssociation);
  });

  server.use('/api', (req, res) => {
    proxyApi.web(req, res);
  });

  server.use(compression());
  server.use(bodyParser.json());
  server.use(useragent.express());
  server.use(cookieParser());
  server.use(cors());

  // Static content
  server.use(
    favicon(
      path.join(process.env.PWD || process.env.pm_cwd, '/static/favicon.ico')
    )
  );
  server.use(
    express.static(path.join(process.env.PWD || process.env.pm_cwd, '/static'))
  );
  server.use(
    '/public',
    express.static(
      path.join(process.env.PWD || process.env.pm_cwd, '/static/dist')
    )
  );

  support(server);

  server.get(/^\/(images|fonts)\/.*/, (req, res) => {
    res.redirect(301, `//quran-1f14.kxcdn.com${req.path}`);
  });
};
