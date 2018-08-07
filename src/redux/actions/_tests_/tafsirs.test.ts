import { fetchTafsirs } from '../tafsirs';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

const chapterId = 1;
const verseId = 1;
const tafsirId = 1;

describe('tafsirs action', () => {
  describe('fetchTafsirs', () => {
    it('returns a promise', () => {
      fetchTafsirs(chapterId, verseId, tafsirId);

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(
        `/api/v3/chapters/${chapterId}/verses/${verseId}/tafsirs`,
        {
          params: { tafsirs: tafsirId },
        }
      );
    });
  });
});
