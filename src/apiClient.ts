/* global fetch */
import qs from 'qs';
import { decamelizeKeys } from 'humps';
import cookie from 'react-cookie';

import config from '../config';

const contentLanguage = (): string =>
  cookie.load('currentLocale') || config('defaultLocale');

const formatUrl = (path: string): string => {
  let adjustedPath = path;

  if (path[0] !== '/') {
    adjustedPath = `/${path}`;
  }

  if (__SERVER__) {
    if (adjustedPath.startsWith('/onequran')) {
      return config('oneQuran') + adjustedPath.replace('/onequran', '');
    }

    return `${config('api')}${adjustedPath}`;
  }

  if (adjustedPath.startsWith('/onequran')) {
    return adjustedPath;
  }

  return `/api${adjustedPath}`;
};

interface Options {
  params?: $TsFixMe;
  data?: $TsFixMe;
  arrayFormat?: 'indices' | 'brackets' | 'repeat';
}

const apiClient = {
  get(path: string, { params = {}, arrayFormat } = {} as Options) {
    const options = { method: 'get' };
    const queryParams = params;

    queryParams.language = params.language || contentLanguage();

    const query = qs.stringify(decamelizeKeys(params), {
      arrayFormat: arrayFormat || 'brackets',
    });

    const request = fetch(formatUrl(`${path}?${query}`), options);

    return request.then(response => response.json());
  },
};

export default apiClient;
