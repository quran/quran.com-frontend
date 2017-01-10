import { ayahsSchema } from 'redux/schemas';
import { arrayOf } from 'normalizr';

import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAIL
  } from 'redux/constants/search.js';

export function search(params) {
  return {
    types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
    schema: { results: arrayOf({ ayah: ayahsSchema }) },
    // TODO: We are doing this because of a weird obj.hasOwnProperty method missing on `params`
    promise: client => client.get('/v2/search', { params: { q: params.q } }),
    params
  };
}

export function isQueried() {
  return false;
}
