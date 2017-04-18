import { chaptersSchema } from 'redux/schemas';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_FAIL,
  SET_CURRENT
} from 'redux/constants/chapters.js';

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: { chapters: [chaptersSchema] },
    promise: client => client.get('/api/v3/chapters')
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: { chapter: chaptersSchema },
    promise: client => client.get(`/api/v3/chapters/${id}`)
  };
}

export const loadInfo = params => ({
  types: [LOAD_INFO, LOAD_INFO_SUCCESS, LOAD_INFO_FAIL],
  promise: client =>
    client.get(`/api/v3/chapters/${params.chapterId}/info`, {
      params: {
        language: params.language || 'en'
      }
    }),
  id: params.chapterId
});

export const setCurrent = id => ({
  type: SET_CURRENT,
  current: id
});

export function isSingleLoaded(globalState, id) {
  return !!globalState.chapters.entities[id];
}

export function isAllLoaded(globalState) {
  return Object.keys(globalState.chapters.entities).length === 114;
}

export function isInfoLoaded(globalState, id) {
  return globalState.chapters.entities[id] && globalState.chapters.infos[id];
}
