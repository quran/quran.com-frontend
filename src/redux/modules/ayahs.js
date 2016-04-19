import { ayahsSchema } from '../schemas';

import { arrayOf } from 'normalizr';

import { createFontFacesArray } from '../../helpers/buildFontFaces';

export const LOAD = '@@quran/ayahs/LOAD';
export const LOAD_SUCCESS = '@@quran/ayahs/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/ayahs/LOAD_FAIL';
export const CLEAR_CURRENT = '@@quran/ayahs/CLEAR_CURRENT';
export const SET_CURRENT_AYAH = '@@quran/ayahs/SET_CURRENT_AYAH';
export const SET_CURRENT_WORD = '@@quran/ayahs/SET_CURRENT_WORD';
export const CLEAR_CURRENT_WORD = '@@quran/ayahs/CLEAR_CURRENT_WORD';

const initialState = {
  current: null,
  currentWord: null,
  errored: false,
  loaded: false,
  entities: {},
  result: [],
  fontFaces: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_AYAH:
      console.log('SET_CURRENT_AYAH', action);
      return {
        ...state,
        current: action.id,
        currentWord: state.current == action.id ? state.currentWord : null
      };
    case SET_CURRENT_WORD:
      console.log('SET_CURRENT_WORD', action);
      let currentAyah = state.current;
      if (action.id && currentAyah) {
        if (!(new RegExp('^'+ currentAyah +':')).test(action.id)) {
          currentAyah = action.id.match(/^\d+:\d+/g)[0];
        }
      }
      return {
        ...state,
        current: currentAyah,
        currentWord: action.id
      };
    case CLEAR_CURRENT_WORD:
      console.log('CLEAR_CURRENT_WORD', action);
      return {
        ...state,
        currentWord: null
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        currentWord: null,
        entities: {
          ...state.entities,
          [action.id]: {}
        }
      };
    case LOAD:
      console.log('LOAD', { action, state });
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('LOAD_SUCCESS', { action, state });
      let current = state.current ? state.current : action.result.result[0];
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
      console.log('LOAD_FAIL', { action, state });
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
    }).then((res) => { // TODO combine this in the previous request's code (in api)
      res.forEach((ayah) => {
        if (ayah.audio.mp3 && ayah.audio.mp3.segments) {
          ayah.audio.segments = ayah.audio.mp3.segments; // hack
        } else
        if (ayah.audio.ogg && ayah.audio.ogg.segments) {
          ayah.audio.segments = ayah.audio.ogg.segments; // hack
        } else {
          ayah.audio.segments = null;
        }
      });

      //if (audio == 2 || res && res[0] && res[0].audio && res[0].audio.has_segments) { // TODO implement a has_segments property on the result
      //}
      return res;
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

export function clearCurrentWord() {
  return {
    type: CLEAR_CURRENT_WORD
  };
}

export function setCurrentAyah(id) {
  console.log('setCurrentAyah');
  return {
    type: SET_CURRENT_AYAH,
    id
  };
}

export function setCurrentWord(id) {
  return {
    type: SET_CURRENT_WORD,
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
