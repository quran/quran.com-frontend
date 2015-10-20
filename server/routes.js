import superagent from 'superagent';
import * as Settings from 'constants/Settings';
// Cache for the time being until we change this
const apicache = require('apicache').options({ debug: true }).middleware;

import debugLib from 'debug';
const debug = debugLib('quran');

export default function(server) {
  server.get(/^\/(images|fonts)\/.*/, function(req, res) {
    res.redirect(301, '//quran-1f14.kxcdn.com' + req.path);
  });

  server.get('/api/*', function(req, res) {
    debug(`To API: ${req.url}`);

    superagent.get(Settings.api + req.url.substr(5))
    .end(function(err, response) {
      if (err) {
        return res.status(500).send(response);
      }

      return res.status(200).send(response.body);
    });
  });
  // server.use('/auth', require('./auth'));
};
