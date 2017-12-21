import { handleActions } from 'redux-actions';

import { SUGGEST } from '../constants/suggest';

export const INITIAL_STATE = {
  errored: false,
  loaded: false,
  results: {}
};

export default handleActions(
  {
    [SUGGEST.ACTION]: state => ({
      ...state,
      loaded: false,
      loading: true
      // query: action.params.q || action.params.query,
      // page: action.params.p || action.params.page
    }),
    [SUGGEST.SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      loaded: true,
      results: {
        ...state.results,
        [action.query]: action.result
      }
    }),
    [SUGGEST.FAILURE]: state => ({
      ...state,
      errored: true
    })
  },
  INITIAL_STATE
);
