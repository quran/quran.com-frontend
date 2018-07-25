import { handleActions } from 'redux-actions';
import { handle } from 'redux-pack';

import {
  FETCH_VERSES,
  CLEAR_CURRENT,
  SET_CURRENT_VERSE,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD,
} from '../constants/verses';

export const INITIAL_STATE: $TsFixMe = {
  current: null,
  currentWord: null,
  error: null,
  loading: false,
  entities: {},
  result: [],
};

export default handleActions(
  {
    [SET_CURRENT_VERSE]: (state, action) => ({
      ...state,
      current: action.id,
      currentWord: state.current === action.id ? state.currentWord : null,
    }),
    [SET_CURRENT_WORD]: (state, action) => {
      let currentVerse = state.current;
      if (action.id && currentVerse) {
        if (!new RegExp(`^${currentVerse}:`).test(action.id)) {
          currentVerse = action.id.match(/^\d+:\d+/g)[0];
        }
      }
      return {
        ...state,
        current: currentVerse,
        currentWord: action.id,
      };
    },
    [CLEAR_CURRENT_WORD]: state => ({
      ...state,
      currentWord: null,
    }),
    [CLEAR_CURRENT]: (state, action) => {
      const entities = state.entities;
      return {
        ...state,
        current: null,
        currentWord: null,
        entities: {
          ...entities,
          [action.id]: {},
        },
      };
    },
    [FETCH_VERSES]: (state, action) =>
      handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
        }),
        success: prevState => ({
          ...prevState,
          entities: {
            ...state.entities,
            [action.chapterId]: Object.assign(
              {},
              state.entities[action.chapterId],
              action.result.entities.verses
            ),
          },
          result: Object.assign({}, state.result, action.result.result),
        }),
        failure: prevState => ({
          ...prevState,
          error: action.payload,
        }),
      }),
  },
  INITIAL_STATE
);
