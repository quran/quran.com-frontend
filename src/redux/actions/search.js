import { versesSchema } from 'redux/schemas';

import { SEARCH } from 'redux/constants/search.js';

export function search(params) {
  return {
    types: [SEARCH.ACTION, SEARCH.SUCCESS, SEARCH.FAILURE],
    schema: { results: [versesSchema] },
    // TODO: We are doing this because of a weird obj.hasOwnProperty method missing on `params`
    promise: client =>
      client.get('/api/v3/search', { params: { q: params.q, p: params.p } }),
    params
  };
}

export function isQueried() {
  return false;
}
