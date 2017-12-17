import { SEARCH, SEARCH_SUCCESS, SEARCH_FAIL } from 'redux/constants/search.js';

const initialState = {
  errored: false,
  loaded: false,
  results: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        loaded: false,
        loading: true
        // query: action.params.q || action.params.query,
        // page: action.params.p || action.params.page
      };
    case SEARCH_SUCCESS:
      return {
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
      };
    case SEARCH_FAIL:
      return {
        ...state,
        errored: true
      };
    default:
      return state;
  }
}
