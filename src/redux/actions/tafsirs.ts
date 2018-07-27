import { FETCH_TAFSIR } from '../constants/tafsirs';
import apiClient from '../../apiClient';
import { ChapterId, VerseId, TafsirId } from '../../types';

// eslint-disable-next-line
export const fetchTafsirs = (
  chapterId: ChapterId,
  verseId: VerseId,
  tafsirId: TafsirId
) => ({
  type: FETCH_TAFSIR,
  promise: apiClient.get(
    `/api/v3/chapters/${chapterId}/verses/${verseId}/tafsirs`,
    {
      params: {
        tafsirs: tafsirId,
      },
    }
  ),
  meta: {
    chapterId,
    verseId,
    tafsirId,
  },
});

export type FetchTafsirs = typeof fetchTafsirs;
