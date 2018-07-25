import { SUGGEST } from '../constants/suggest.js';
import ApiClient from '../../helpers/ApiClient';

const client = new ApiClient();

export function suggest(query, lang = 'en') {
  fetch.mockResponse(JSON.stringify({}));
  return {
    types: [SUGGEST.ACTION, SUGGEST.SUCCESS, SUGGEST.FAILURE],
    promise: client.get('/api/v3/suggest', { params: { q: query, l: lang } }),
    query
  };
}

export function isQueried() {
  return false;
}
