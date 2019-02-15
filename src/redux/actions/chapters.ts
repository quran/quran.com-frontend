import { FETCH_CHAPTERS, FETCH_CHAPTER } from '../constants/chapters';
import apiClient from '../../apiClient';
import { ChapterId } from '../../types';

export function fetchChapters() {
  return {
    type: FETCH_CHAPTERS,
    promise: apiClient.get('/api/v3/chapters'),
  };
}

export function fetchChapter(id: ChapterId) {
  return {
    type: FETCH_CHAPTER,
    promise: apiClient.get(`/api/v3/chapters/${id}`),
  };
}

export type FetchChapters = typeof fetchChapters;
