import { surahsSchema } from '../schemas';
import { arrayOf } from 'normalizr';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_FAIL,
  SET_CURRENT
  } from '../constants/SurahsActionTypes.js'

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(surahsSchema),
    promise: (client) => client.get('/v2/surahs')
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(surahsSchema),
    promise: (client) => client.get(`/v2/surahs/${id}`)
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
