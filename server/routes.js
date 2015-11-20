var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

import ls from 'loopstacks';
import Settings from 'constants/Settings';
import debug from 'utils/Debug';

export default function(server) {
  server.use(ls({
    app: server,
    path: '/loopstacks'
  }));

  server.get(/^\/(images|fonts)\/.*/, function(req, res) {
    res.redirect(301, '//quran-1f14.kxcdn.com' + req.path);
  });

  server.all('/api/*', function(req, res) {
    debug('api:API', `Request: ${req.url}`);

    request.get(`${Settings.api}/${req.url.substr(4)}`)
    .end()
    .then(function(response) {
      debug('api:API', `Respond: ${req.url}`);
      return res.status(200).send(response.body);
    }, function() {
      console.info('Errored API at: ' + req.url);
      return res.status(500).send(response);
    });
  });
};
