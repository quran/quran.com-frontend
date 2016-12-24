import { surahsSchema } from 'redux/schemas';
import { arrayOf } from 'normalizr';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_FAIL,
  SET_CURRENT } from 'redux/constants/surahs.js';

export const loadAll = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  schema: arrayOf(surahsSchema),
  promise: (client) => client.get('/v2/surahs')
});

export const load = id => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  schema: arrayOf(surahsSchema),
  promise: (client) => client.get(`/v2/surahs/${id}`)
});

export const loadInfo = id => ({
  types: [LOAD_INFO, LOAD_INFO_SUCCESS, LOAD_INFO_FAIL],
  promise: (client) => client.get(`/v2/surahs/${id}/info`),
  id
});

export const setCurrent = id => ({
  type: SET_CURRENT,
  current: id
});

export function isSingleLoaded(globalState, id) {
  return !!globalState.surahs.entities[id];
}

export function isAllLoaded(globalState) {
  return Object.keys(globalState.surahs.entities).length === 114;
}
