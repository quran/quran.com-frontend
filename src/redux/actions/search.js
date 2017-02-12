import { versesSchema } from 'redux/schemas';

import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAIL
  } from 'redux/constants/search.js';

export function search(params) {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    schema: { results: [{ ayah: versesSchema }] },
    // TODO: We are doing this because of a weird obj.hasOwnProperty method missing on `params`
    promise: client => client.get('/v2/search', { params: { q: params.q, p: params.p } }),
    params
  };
}

export function isQueried() {
  return false;
}
