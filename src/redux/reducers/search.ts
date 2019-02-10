import camelcaseKeys from 'camelcase-keys';
import { handle } from 'redux-pack';

import { FETCH_SEARCH } from '../constants/search';
import { VerseShape } from '../../shapes';

type State = {
  errored: boolean;
  isLoading: boolean;
  totalCount: number | null;
  totalPages: number | null;
  currentPage: number | null;
  perPage: number | null;
  took: number | null;
  query: string | null;
  entities: Array<VerseShape>;
};

export const INITIAL_STATE: State = {
  errored: false,
  isLoading: false,
  totalCount: null,
  totalPages: null,
  currentPage: null,
  perPage: null,
  took: null,
  query: null,
  entities: [],
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
          totalCount: action.payload.total_count,
          totalPages: action.payload.total_pages,
          currentPage: action.payload.current_page,
          perPage: action.payload.per_page,
          took: action.payload.took,
          query: action.payload.query,
          entities: camelcaseKeys(action.payload.results || {}, { deep: true }),
        }),
      });
    }
    default:
      return state;
  }
};
