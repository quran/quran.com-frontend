import { fetchTranslations, fetchReciters, fetchTafsirs } from '../options';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

describe('options actions', () => {
  describe('fetchTranslations', () => {
    it('returns a promise', () => {
      fetchTranslations();

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(
        `/api/v3/options/translations`
      );
    });
  });

  describe('fetchReciters', () => {
    it('returns a promise', () => {
      fetchReciters();

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(`/api/v3/options/recitations`);
    });
  });

  describe('fetchTafsirs', () => {
    it('returns a promise', () => {
      fetchTafsirs();

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(`/api/v3/options/tafsirs`);
    });
  });
});
