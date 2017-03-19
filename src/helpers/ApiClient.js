import superagent from 'superagent';
import qs from 'qs';
import { decamelizeKeys } from 'humps';
import cookie from 'react-cookie';

import config from 'config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function contentLanguage() {
  return cookie.load('currentLocale') || config.defaultLocale;
}

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  if (__SERVER__) {
    if (adjustedPath.startsWith('/onequran')) {
      return config.oneQuran + adjustedPath.replace('/onequran', '');
    }

    return `${config.api}${adjustedPath}`;
  }

  if (adjustedPath.startsWith('/onequran')) {
    return adjustedPath;
  }

  return `/api${adjustedPath}`;
}

export default class {
  constructor(req) {
    methods.forEach((method) => {
      this[method] = (path, { params, data, arrayFormat } = {}) =>
      new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        params = params || {};

        params['language'] = contentLanguage();

        request.query(qs.stringify(decamelizeKeys(params), {
          arrayFormat: arrayFormat || 'brackets'
        }));

        if (cookie.load('auth')) {
          const headers = cookie.load('auth');
          Object.keys(headers).forEach(key => request.set(key, headers[key]));
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(decamelizeKeys(data));
        }

        request.end((err, { header, body } = {}) => {
          if (err) {
            return reject(body || err);
          }

          if (header['access-token']) {
            cookie.save('auth', {
              'access-token': header['access-token'],
              client: header.client,
              expiry: header.expiry,
              uid: header.uid,
              'token-type': 'Bearer'
            });
          }

          return resolve(body);
        });
      });
    });
  }
}
