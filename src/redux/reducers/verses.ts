import keyBy from 'lodash/keyBy';
import { camelizeKeys } from 'humps';
import { handle } from 'redux-pack';

import { FETCH_VERSES } from '../constants/verses';

type State = {
  current?: string;
  currentWord?: $TsFixMe;
  error: $TsFixMe;
  isLoading: boolean;
  entities: $TsFixMe;
  result: $TsFixMe;
};

export const INITIAL_STATE: State = {
  current: null,
  currentWord: null,
  error: null,
  isLoading: false,
  entities: {},
  result: [],
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_VERSES: {
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
            [action.meta.chapterId]: {
              ...state.entities[action.meta.chapterId],
              ...camelizeKeys(keyBy(action.payload.verses, 'verse_key')),
            },
          },
        }),
        failure: prevState => ({
          ...prevState,
          error: action.payload,
        }),
      });
    }

    default:
      return state;
  }
};
