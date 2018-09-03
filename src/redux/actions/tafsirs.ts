import { FETCH_TAFSIR } from '../constants/tafsirs';
import apiClient from '../../apiClient';
import { ChapterId, VerseId, TafsirId } from '../../types';

type Payload = {
  chapterId: ChapterId;
  verseId: VerseId;
  tafsirIds: Array<TafsirId>;
  verseKey: string;
};

// eslint-disable-next-line
export const fetchTafsirs = ({
  chapterId,
  verseId,
  tafsirIds,
  verseKey,
}: Payload) => ({
  type: FETCH_TAFSIR,
  promise: apiClient.get(
    `/api/v3/chapters/${chapterId}/verses/${verseId}/tafsirs`,
    {
      params: {
        tafsirs: tafsirIds,
      },
    }
  ),
  meta: {
    chapterId,
    verseId,
    tafsirIds,
    verseKey,
  },
});

export type FetchTafsirs = typeof fetchTafsirs;
