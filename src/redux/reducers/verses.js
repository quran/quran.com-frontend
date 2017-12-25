import { handleActions } from 'redux-actions';

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR_CURRENT,
  SET_CURRENT_VERSE,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD,
  LOAD_TAFSIR,
  LOAD_TAFSIR_SUCCESS
} from '../constants/verses';

export const INITIAL_STATE = {
  current: null,
  currentWord: null,
  errored: false,
  loaded: false,
  loading: false,
  entities: {},
  result: [],
  tafsirLoading: false,
  tafsirs: []
};

export default handleActions(
  {
    [SET_CURRENT_VERSE]: (state, action) => ({
      ...state,
      current: action.id,
      currentWord: state.current === action.id ? state.currentWord : null
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
        currentWord: action.id
      };
    },
    [CLEAR_CURRENT_WORD]: state => ({
      ...state,
      currentWord: null
    }),
    [CLEAR_CURRENT]: (state, action) => {
      const entities = state.entities;
      return {
        ...state,
        current: null,
        currentWord: null,
        entities: {
          ...entities,
          [action.id]: {}
        }
      };
    },
    [LOAD]: state => ({
      ...state,
      loaded: false,
      loading: true
    }),
    [LOAD_SUCCESS]: (state, action) => {
      const current = state.current ? state.current : action.result.result[0];
      const stateEntities = state.entities;

      return {
        ...state,
        current,
        loaded: true,
        loading: false,
        errored: false,
        entities: {
          ...stateEntities,
          [action.chapterId]: Object.assign(
            {},
            state.entities[action.chapterId],
            action.result.entities.verses
          )
        },
        result: Object.assign({}, state.result, action.result.result)
      };
    },
    [LOAD_FAIL]: state => state,
    [LOAD_TAFSIR]: state => ({
      ...state,
      tafsirLoading: true
    }),
    [LOAD_TAFSIR_SUCCESS]: (state, action) => {
      const tafsir = action.result.tafsirs[0];

      return {
        ...state,
        tafsirLoading: false,
        tafsirs: {
          ...state.entities,
          [`${tafsir.verseKey}-${action.tafsirId}`]: tafsir
        }
      };
    }
  },
  INITIAL_STATE
);
