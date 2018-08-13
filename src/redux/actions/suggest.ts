import { FETCH_SUGGEST } from '../constants/suggest';
import apiClient from '../../apiClient';

// eslint-disable-next-line
export function fetchSuggest(query: string, lang = 'en') {
  return {
    type: FETCH_SUGGEST,
    // TODO: We are doing this because of a weird obj.hasOwnProperty method missing on `params`
    promise: apiClient.get('/api/v3/suggest', {
      params: { q: query, l: lang },
    }),
    meta: {
      query,
    },
  };
}

export type FetchSuggest = typeof fetchSuggest;
