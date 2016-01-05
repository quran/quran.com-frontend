import config from '../config';
import httpProxy from 'http-proxy';

const proxyApi = httpProxy.createProxyServer({
  target: `${config.apiUrl}`,
  ws: true
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
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

export default function(app) {
  app.use('/api', (req, res) => {
    proxyApi.web(req, res);
  });
}
