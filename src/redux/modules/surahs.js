import { surahsSchema } from '../schemas';
import { arrayOf } from 'normalizr';

export const LOAD = '@@quran/surahs/LOAD';
export const LOAD_SUCCESS = '@@quran/surahs/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/surahs/LOAD_FAIL';
export const LOAD_INFO = '@@quran/surahs/LOAD_INFO';
export const LOAD_INFO_SUCCESS = '@@quran/surahs/LOAD_INFO_SUCCESS';
export const LOAD_INFO_FAIL = '@@quran/surahs/LOAD_INFO_FAIL';
export const SET_CURRENT = '@@quran/surahs/SET_CURRENT';
export const TOGGLE_SURAH_INFO = '@@quran/options/TOGGLE_SURAH_INFO';

const initialState = {
  isShowingInfo: false,
  errored: false,
  loaded: false,
  current: null,
  entities: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT:
      return {
        ...state,
        current: action.current
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        errored: false,
        entities: Object.assign({}, state.entities, action.result.entities.surahs),
        result: Object.assign({}, state.result, action.result.result)
      };
    case LOAD_FAIL:
      console.log(action);
      return state;
    case TOGGLE_SURAH_INFO:
      return {
        ...state,
        isShowingInfo: !state.isShowingInfo
      };
    default:
      return state;
  }
}

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(surahsSchema),
    promise: (client) => client.get(`/surahs`)
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(surahsSchema),
    promise: (client) => client.get(`/surahs/${id}`)
  };
}

export function loadInfo(link) {
  return {
    types: [LOAD_INFO, LOAD_INFO_SUCCESS, LOAD_INFO_FAIL],
    promise: (client) => client.get(`http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${link}&redirects=true`) // eslint-disable-line max-len
  };
}

export function setCurrent(id) {
  return {
    type: SET_CURRENT,
    current: id
  };
}

export function isSingleLoaded(globalState, id) {
  return !!globalState.surahs.entities[id];
}

export function isAllLoaded(globalState) {
  return Object.keys(globalState.surahs.entities).length === 114;
}

export function toggleSurahInfo() {
  return {
    type: TOGGLE_SURAH_INFO
  };
}
