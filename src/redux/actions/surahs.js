import { surahsSchema } from 'redux/schemas';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_FAIL,
  SET_CURRENT } from 'redux/constants/surahs.js';

//TODO: experiment changes to test different content locale
import config from '../../config';
import cookie from 'react-cookie';

function contentLanguage() {
  return {language: cookie.load('currentLocale') || config.defaultLocale}
}

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: [surahsSchema],
    promise: client => client.get('/v3/chapters', {params: contentLanguage()})
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: [surahsSchema],
    promise: client => client.get(`/v3/chapters/${id}`, {params: contentLanguage()})
  };
}

export const loadInfo = id => ({
  types: [LOAD_INFO, LOAD_INFO_SUCCESS, LOAD_INFO_FAIL],
  promise: client => client.get(`/v3/chapters/${id}/info`, {params: contentLanguage()}),
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
