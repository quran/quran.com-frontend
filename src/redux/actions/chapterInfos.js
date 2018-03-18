import { FETCH_CHAPTER_INFO } from '../constants/chapterInfos';
import ApiClient from '../../helpers/ApiClient';

const client = new ApiClient();

export const loadChapterInfo = params => ({
  types: [
    FETCH_CHAPTER_INFO.ACTION,
    FETCH_CHAPTER_INFO.SUCCESS,
    FETCH_CHAPTER_INFO.FAIL
  ],
  promise: client.get(`/api/v3/chapters/${params.chapterId}/info`, {
    params: {
      language: params.language || 'en'
    }
  }),
  id: params.chapterId
});

export function isChapterInfoLoaded(globalState, id) {
  return globalState.chapters.entities[id] && globalState.chapters.infos[id];
}
