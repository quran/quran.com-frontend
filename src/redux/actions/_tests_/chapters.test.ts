import { fetchChapter, fetchChapters } from '../chapters';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

const chapterId = 1;

describe('chapters action', () => {
  describe('fetchChapter', () => {
    it('returns a promise', () => {
      fetchChapter(chapterId);

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(
        `/api/v3/chapters/${chapterId}`
      );
    });
  });

  describe('fetchChapters', () => {
    it('returns a promise', () => {
      fetchChapters();

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith('/api/v3/chapters');
    });
  });
});
