import { versesSchema } from '../schemas';

import { FETCH_SEARCH } from '../constants/search';
import apiClient from '../../apiClient';

export function search(params: any) {
  return {
    type: FETCH_SEARCH,
    schema: { results: [versesSchema] },
    // TODO: We are doing this because of a weird obj.hasOwnProperty method missing on `params`
    promise: apiClient.get('/api/v3/search', {
      params: { q: params.q, p: params.p },
    }),
    params,
  };
}

export function isQueried() {
  return false;
}
