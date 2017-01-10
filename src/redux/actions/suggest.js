import {
  SUGGEST,
  SUGGEST_SUCCESS,
  SUGGEST_FAIL
} from 'redux/constants/suggest.js';

export function suggest(query, lang = 'en') {
  return {
    types: [SUGGEST, SUGGEST_SUCCESS, SUGGEST_FAIL],
    promise: client => client.get('/v2/suggest', { params: { q: query, l: lang } }),
    query
  };
}

export function isQueried() {
  return false;
}
