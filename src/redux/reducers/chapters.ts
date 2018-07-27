import { handle } from 'redux-pack';
import { camelizeKeys } from 'humps';
import keyBy from 'lodash/keyBy';

import { FETCH_CHAPTERS } from '../constants/chapters';

export const INITIAL_STATE = {
  errored: false,
  isLoading: false,
  entities: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_CHAPTERS: {
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
          entities: {
            ...state.entities,
            ...camelizeKeys(keyBy(action.payload.chapters, 'id')),
          },
        }),
      });
    }
    default:
      return state;
  }
};
