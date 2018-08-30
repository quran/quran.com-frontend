import { fetchJuzs } from '../juzs';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

describe('juzs action', () => {
  describe('fetchJuzs', () => {
    it('returns a promise', () => {
      fetchJuzs();

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(`/api/v3/juzs`);
    });
  });
});
