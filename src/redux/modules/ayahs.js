import { ayahsSchema } from '../schemas';
import { arrayOf } from 'normalizr';

import { createFontFacesArray } from '../../helpers/buildFontFaces';

export const LOAD = '@@quran/ayahs/LOAD';
export const LOAD_SUCCESS = '@@quran/ayahs/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/ayahs/LOAD_FAIL';
export const CLEAR_CURRENT = '@@quran/ayahs/CLEAR_CURRENT';
export const SET_CURRENT_AYAH = '@@quran/ayahs/SET_CURRENT_AYAH';

const initialState = {
  current: null,
  errored: false,
  loaded: false,
  entities: {},
  result: [],
  fontFaces: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_AYAH:
      return {
        ...state,
        current: action.id
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.id]: {}
        }
      };
    case LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case LOAD_SUCCESS:
      let current = state.current === null ? action.result.result[0] : state.current;
      return {
        ...state,
        current,
        loaded: true,
        loading: false,
        errored: false,
        entities: {
          ...state.entities,
          [action.surahId]: Object.assign({}, state.entities[action.surahId], action.result.entities.ayahs)
        },
        result: Object.assign({}, state.result, action.result.result),
        fontFaces: new Set([...state.fontFaces, ...createFontFacesArray(action.result.result.map(key => action.result.entities.ayahs[key]))]),
      };
    case LOAD_FAIL:
      console.log(action);
      return state;
    default:
      return state;
  }
}

// For safe measure
const defaultOptions = {
  audio: 8,
  quran: 1,
  content: [19]
};

export function load(id, from, to, options = defaultOptions) {
  const { audio, quran, content } = options;

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(ayahsSchema),
    promise: (client) => client.get(`/surahs/${id}/ayat`, {
      params: {
        from,
        to,
        audio,
        quran,
        content
      }
    }),
    surahId: id
  };
}

export function clearCurrent(id) {
  return {
    type: CLEAR_CURRENT,
    id
  };
}

export function setCurrentAyah(id) {
  return {
    type: SET_CURRENT_AYAH,
    id
  };
}

export function isLoaded(globalState, surahId, from, to) {
  return (
    globalState.ayahs.entities[surahId] &&
    globalState.ayahs.entities[surahId][`${surahId}:${from}`] &&
    globalState.ayahs.entities[surahId][`${surahId}:${to}`]
  );
}
