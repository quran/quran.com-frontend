import { FETCH_SUGGEST } from '../constants/suggest';
import apiClient from '../../apiClient';

// eslint-disable-next-line
export function suggest(query: string, lang: string = 'en') {
  return {
    types: FETCH_SUGGEST,
    promise: apiClient.get('/api/v3/suggest', {
      params: { q: query, l: lang },
    }),
    meta: {
      q: query,
      l: lang,
    },
  };
}
