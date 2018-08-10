import { FETCH_SEARCH } from '../constants/search';
import apiClient from '../../apiClient';

type Params = {
  q: string;
  p?: string | number;
};

// eslint-disable-next-line
export function fetchSearch(params: Params) {
  return {
    type: FETCH_SEARCH,
    // TODO: We are doing this because of a weird obj.hasOwnProperty method missing on `params`
    promise: apiClient.get('/api/v3/search', {
      params: { q: params.q, p: params.p },
    }),
    meta: {
      ...params,
    },
  };
}

export type FetchSearch = typeof fetchSearch;
