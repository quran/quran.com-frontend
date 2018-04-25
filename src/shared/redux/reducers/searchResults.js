import { handleActions } from 'redux-actions';

import { SEARCH } from '../constants/search.js';

export const INITIAL_STATE = {
  errored: false,
  loaded: false,
  results: []
};

export default handleActions(
  {
    [SEARCH.ACTION]: state => ({
      ...state,
      loaded: false,
      loading: true
      // query: action.params.q || action.params.query,
      // page: action.params.p || action.params.page
    }),
    [SEARCH.SUCCESS]: (state, action) => ({
      ...state,
      loaded: true,
      loading: false,
      errored: false,
      totalCount: action.result.result.totalCount,
      totalPages: action.result.result.totalPages,
      currentPage: action.result.result.currentPage,
      perPage: action.result.result.perPage,
      took: action.result.result.took,
      query: action.result.result.query,
      results: action.result.result.results,
      entities: action.result.entities.verses
    }),
    [SEARCH.FAILURE]: state => ({
      ...state,
      errored: true
    })
  },
  INITIAL_STATE
);
