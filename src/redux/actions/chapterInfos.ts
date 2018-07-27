import { FETCH_CHAPTER_INFO } from '../constants/chapterInfos';
import apiClient from '../../apiClient';
import { ChapterId } from '../../types';

export const fetchChapterInfo = (chapterId: ChapterId, language?: string) => ({
  type: FETCH_CHAPTER_INFO,
  promise: apiClient.get(`/api/v3/chapters/${chapterId}/info`, {
    params: {
      language: language || 'en',
    },
  }),
  meta: {
    chapterId,
  },
});

export function isChapterInfoLoaded(globalState: any, id: ChapterId) {
  return (
    globalState.chapters.entities[id] && globalState.chapterInfos.entities[id]
  );
}

export type FetchChapterInfo = typeof fetchChapterInfo;
