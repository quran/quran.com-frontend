import {
  SUGGEST,
  SUGGEST_SUCCESS,
  SUGGEST_FAIL
} from 'redux/constants/suggest.js';

const initialState = {
  errored: false,
  loaded: false,
  results: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUGGEST:
      return {
        ...state,
        loaded: false,
        loading: true
        // query: action.params.q || action.params.query,
        // page: action.params.p || action.params.page
      };
    case SUGGEST_SUCCESS:
      return {
        ...state,
        results: {
          ...state.results,
          [action.query]: action.result,
        }
      };
    case SUGGEST_FAIL:
      return {
        ...state,
        errored: true
      };
    default:
      return state;
  }
}
