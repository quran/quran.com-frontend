import { versesSchema } from 'redux/schemas';

import { SEARCH } from '../constants/search.js';
import ApiClient from '../../helpers/ApiClient';

const client = new ApiClient();

export function search(params) {
  return {
    types: [SEARCH.ACTION, SEARCH.SUCCESS, SEARCH.FAILURE],
    schema: { results: [versesSchema] },
    // TODO: We are doing this because of a weird obj.hasOwnProperty method missing on `params`
    promise: client.get('/api/v3/search', {
      params: { q: params.q, p: params.p }
    }),
    params
  };
}

export function isQueried() {
  return false;
}
