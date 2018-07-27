import { handle } from 'redux-pack';

import { FETCH_SEARCH } from '../constants/search';

type State = {
  errored: boolean;
  isLoading: boolean;
  results: $TsFixMe;
};

export const INITIAL_STATE: State = {
  errored: false,
  isLoading: false,
  results: [],
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_SEARCH: {
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
        }),
        finish: prevState => ({
          ...prevState,
          isLoading: false,
        }),
        success: prevState => ({
          ...prevState,
          isLoading: false,
          totalCount: action.result.result.totalCount,
          totalPages: action.result.result.totalPages,
          currentPage: action.result.result.currentPage,
          perPage: action.result.result.perPage,
          took: action.result.result.took,
          query: action.result.result.query,
          results: action.result.result.results,
          entities: action.result.entities.verses,
        }),
      });
    }
    default:
      return state;
  }
};
