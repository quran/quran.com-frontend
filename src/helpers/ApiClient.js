import superagent from 'superagent';
import qs from 'qs';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  if (__SERVER__) {
    // Prepend host and port of the API server to the path.

    return config.apiUrl + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return `/api${adjustedPath}`;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError:
 * ApiClient is not defined" error.
 * See Issue #14.
 * https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
export default class Client {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data, arrayFormat } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(qs.stringify(params, {arrayFormat: arrayFormat || 'brackets'}));
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(err || body) : resolve(body));
      }));
  }
}
