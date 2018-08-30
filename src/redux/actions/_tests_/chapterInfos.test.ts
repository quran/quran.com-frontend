import { fetchChapterInfo } from '../chapterInfos';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

const chapterId = 1;

describe('chapterInfos action', () => {
  describe('fetchChapterInfo', () => {
    it('returns a promise', () => {
      fetchChapterInfo(chapterId);

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(
        `/api/v3/chapters/${chapterId}/info`,
        {
          params: { language: 'en' },
        }
      );
    });
  });
});
