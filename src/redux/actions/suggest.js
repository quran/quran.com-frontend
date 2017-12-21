import { SUGGEST } from 'redux/constants/suggest.js';

export function suggest(query, lang = 'en') {
  return {
    types: [SUGGEST.ACTION, SUGGEST.SUCCESS, SUGGEST.FAILURE],
    promise: client =>
      client.get('/api/v3/suggest', { params: { q: query, l: lang } }),
    query
  };
}

export function isQueried() {
  return false;
}
