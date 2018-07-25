import { chaptersSchema } from '../schemas';
import {
  FETCH_CHAPTERS,
  FETCH_CHAPTER,
  SET_CURRENT,
} from '../constants/chapters';
import apiClient from '../../apiClient';
import { ChapterId } from '../../types';

export function fetchChapters() {
  return {
    type: FETCH_CHAPTERS,
    schema: { chapters: [chaptersSchema] },
    promise: apiClient.get('/api/v3/chapters'),
  };
}

export function fetchChapter(id: ChapterId) {
  return {
    type: FETCH_CHAPTER,
    schema: { chapter: chaptersSchema },
    promise: apiClient.get(`/api/v3/chapters/${id}`),
  };
}

export const setCurrent = (id: ChapterId) => ({
  type: SET_CURRENT,
  current: id,
});

export function isSingleLoaded(globalState: any, id: ChapterId) {
  return !!globalState.chapters.entities[id];
}

export function isAllLoaded(globalState: any) {
  return Object.keys(globalState.chapters.entities).length === 114;
}

export type FetchChapters = typeof fetchChapters;
