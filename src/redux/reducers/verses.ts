import keyBy from 'lodash/keyBy';
import { camelizeKeys } from 'humps';
import { handle } from 'redux-pack';

import {
  FETCH_VERSES,
  CLEAR_CURRENT,
  SET_CURRENT_VERSE,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD,
} from '../constants/verses';

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
    case SET_CURRENT_VERSE: {
      return {
        ...state,
        current: action.id,
        currentWord: state.current === action.id ? state.currentWord : null,
      };
    }

    case SET_CURRENT_WORD: {
      let currentVerse = state.current;

      if (action.id && currentVerse) {
        if (!new RegExp(`^${currentVerse}:`).test(action.id)) {
          // eslint-disable-next-line
          currentVerse = action.id.match(/^\d+:\d+/g)[0];
        }
      }

      return {
        ...state,
        current: currentVerse,
        currentWord: action.id,
      };
    }

    case CLEAR_CURRENT_WORD: {
      return {
        ...state,
        currentWord: null,
      };
    }

    case CLEAR_CURRENT: {
      const { entities } = state;

      return {
        ...state,
        current: null,
        currentWord: null,
        entities: {
          ...entities,
          [action.id]: {},
        },
      };
    }

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
              ...state.entities[action.chapterId],
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
