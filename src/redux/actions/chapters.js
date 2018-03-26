import { chaptersSchema } from 'redux/schemas';
import { FETCH_CHAPTERS, SET_CURRENT } from '../constants/chapters.js';
import ApiClient from '../../helpers/ApiClient';

const client = new ApiClient();

export function loadAll() {
  return {
    types: [
      FETCH_CHAPTERS.ACTION,
      FETCH_CHAPTERS.SUCCESS,
      FETCH_CHAPTERS.FAILURE
    ],
    schema: { chapters: [chaptersSchema] },
    promise: client.get('/api/v3/chapters')
  };
}

export function load(id) {
  return {
    types: [
      FETCH_CHAPTERS.ACTION,
      FETCH_CHAPTERS.SUCCESS,
      FETCH_CHAPTERS.FAILURE
    ],
    schema: { chapter: chaptersSchema },
    promise: client.get(`/api/v3/chapters/${id}`)
  };
}

export const setCurrent = id => ({
  type: SET_CURRENT.ACTION,
  current: id
});

export function isSingleLoaded(globalState, id) {
  return !!globalState.chapters.entities[id];
}

export function isAllLoaded(globalState) {
  return Object.keys(globalState.chapters.entities).length === 114;
}
