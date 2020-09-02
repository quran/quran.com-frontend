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
} from 'redux/constants/verses.js';

export { LOAD, LOAD_SUCCESS, CLEAR_CURRENT, SET_CURRENT_VERSE };

const initialState = {
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

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_VERSE: {
      return {
        ...state,
        current: action.id,
        currentWord: state.current === action.id ? state.currentWord : null
      };
    }
    case SET_CURRENT_WORD: {
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
    }
    case CLEAR_CURRENT_WORD: {
      return {
        ...state,
        currentWord: null
      };
    }
    case CLEAR_CURRENT: {
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
    }
    case LOAD: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case LOAD_SUCCESS: {
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
    }
    case LOAD_FAIL: {
      return state;
    }
    case LOAD_TAFSIR:
      return {
        ...state,
        tafsirLoading: true
      };
    case LOAD_TAFSIR_SUCCESS: {
      const tafsir = action.result.tafsirs[0];

      return {
        ...state,
        tafsirs: {
          ...state.entities,
          [`${tafsir.verseKey}-${action.tafsirId}`]: tafsir
        }
      };
    }
    default:
      return state;
  }
}
