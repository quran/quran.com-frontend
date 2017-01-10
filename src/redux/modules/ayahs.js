import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR_CURRENT,
  SET_CURRENT_AYAH,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD
  } from 'redux/constants/ayahs.js';

export {
  LOAD,
  LOAD_SUCCESS,
  CLEAR_CURRENT,
  SET_CURRENT_AYAH,
};

const initialState = {
  current: null,
  currentWord: null,
  errored: false,
  loaded: false,
  loading: false,
  entities: {},
  result: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_AYAH: {
      return {
        ...state,
        current: action.id,
        currentWord: state.current === action.id ? state.currentWord : null
      };
    }
    case SET_CURRENT_WORD: {
      let currentAyah = state.current;
      if (action.id && currentAyah) {
        if (!(new RegExp(`^${currentAyah}:`)).test(action.id)) {
          currentAyah = action.id.match(/^\d+:\d+/g)[0];
        }
      }
      return {
        ...state,
        current: currentAyah,
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
          [action.surahId]: Object.assign(
            {},
            state.entities[action.surahId],
            action.result.entities.ayahs
          )
        },
        result: Object.assign({}, state.result, action.result.result)
      };
    }
    case LOAD_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
