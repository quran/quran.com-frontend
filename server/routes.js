import superagent from 'superagent';
import * as Settings from 'constants/Settings';
// Cache for the time being until we change this
const apicache = require('apicache')
const cache = apicache.options({ debug: true }).middleware;

import debugLib from 'debug';
const debug = debugLib('quran');

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

  server.get('/api/*', cache('60 minutes'), function(req, res) {
    debug(`To API: ${req.url}`);

    superagent.get(Settings.api + req.url.substr(5))
    .end(function(err, response) {
      if (err) {
        console.info('Errored API at: ' + req.url);
        return res.status(500).send(response);
      }
      return res.status(200).send(response.body);
    });
  });

  // server.use('/auth', require('./auth'));
};
