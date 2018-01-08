/* global fetch */
import qs from 'qs';
import { decamelizeKeys } from 'humps';
import cookie from 'react-cookie';

import config from '../config';

const contentLanguage = () =>
  cookie.load('currentLocale') || config.defaultLocale;

const formatUrl = (path) => {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  if (__SERVER__) {
    if (adjustedPath.startsWith('/onequran')) {
      return config.oneQuran + adjustedPath.replace('/onequran', '');
    }

    return `${config.apiInternal}${adjustedPath}`;
  }

  if (adjustedPath.startsWith('/onequran')) {
    return adjustedPath;
  }

  return `${config.apiPublic}${adjustedPath}`;
};

class ApiClient {
  constructor() {
    this.language = contentLanguage();
  }

  // eslint-disable-next-line
  get(path, { params = {}, data, arrayFormat } = {}) {
    const options = { method: 'get' };
    const queryParams = params;

    queryParams.language = params.language || this.language;

    const query = qs.stringify(decamelizeKeys(params), {
      arrayFormat: arrayFormat || 'brackets'
    });

    const request = fetch(formatUrl(`${path}?${query}`), options);

    return request.then(response => response.json());
  }
}

export default ApiClient;
