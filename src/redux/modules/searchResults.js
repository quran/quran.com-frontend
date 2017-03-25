import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAIL
} from 'redux/constants/search.js';

const initialState = {
  errored: false,
  loaded: false,
  entities: {},
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
        total: action.result.total,
        page: action.result.page,
        size: action.result.result.results.length,
        took: action.result.took,
        query: action.result.query,
        results: action.result.result.results,
        entities: Object.assign({}, state.entities, action.result.entities.verses)
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
