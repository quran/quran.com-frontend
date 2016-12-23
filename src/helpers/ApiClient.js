import superagent from 'superagent';
import qs from 'qs';
import { decamelizeKeys } from 'humps';
import cookie from 'react-cookie';

import config from 'config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

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

        if (params) {
          request.query(qs.stringify(decamelizeKeys(params), {
            arrayFormat: arrayFormat || 'brackets'
          }));
        }

        if (cookie.load('accessToken')) {
          request.set('Authorization', `Bearer ${cookie.load('accessToken')}`);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(decamelizeKeys(data));
        }

        request.end((err, { body } = {}) => {
          if (err) {
            return reject(body || err);
          }

          return resolve(body);
        });
      });
    });
  }
}
