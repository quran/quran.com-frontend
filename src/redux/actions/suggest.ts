import { FETCH_SUGGEST } from '../constants/suggest.js';
import apiClient from '../../apiClient.js';

export function suggest(query: string, lang: string = 'en') {
  return {
    types: FETCH_SUGGEST,
    promise: apiClient.get('/api/v3/suggest', {
      params: { q: query, l: lang },
    }),
    query,
  };
}

export function isQueried() {
  return false;
}
