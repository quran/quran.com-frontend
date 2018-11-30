import { handle } from 'redux-pack';
import camelcaseKeys from 'camelcase-keys';

import { FETCH_SUGGEST } from '../constants/suggest';

type State = {
  errored: boolean;
  isLoading: boolean;
  results: { [query: string]: $TsFixMe };
};

export const INITIAL_STATE: State = {
  errored: false,
  isLoading: false,
  results: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_SUGGEST: {
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
          results: {
            ...state.results,
            [action.meta.query]: camelcaseKeys(action.payload || {}, {
              deep: true,
            }),
          },
        }),
      });
    }
    default:
      return state;
  }
};
