var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

import * as Settings from 'constants/Settings';
// Cache for the time being until we change this
const apicache = require('apicache')
const cache = apicache.options({ debug: true }).middleware;

import debug from 'utils/Debug';

export default function(server) {
  server.get('/api/cache/index', function(req, res, next) {
    return res.status(200).send(apicache.getIndex());
  });
  server.get('/api/cache/clear', function(req, res, next) {
    return res.send(200, apicache.clear());
  });

  server.get(/^\/(images|fonts)\/.*/, function(req, res) {
    res.redirect(301, 'https://quran-1f14.kxcdn.com' + req.path);
  });

  server.use('/api/*', function(req, res) {
    debug('api:API', `Request: ${req.url}`);

    request.get(`${Settings.api}/${req.originalUrl.substr(4)}`)
    .end()
    .then(function(response) {
      debug('api:API', `Respond: ${req.url}`);
      return res.status(200).send(response.body);
    }, function() {
      console.info('Errored API at: ' + req.url);
      return res.status(500).send(response);
    });
  });

  // server.use('/auth', require('./auth'));
};
