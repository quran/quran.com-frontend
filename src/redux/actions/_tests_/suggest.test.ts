import { fetchSuggest } from '../suggest';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

const lang = 'en';
const query = 'Noah';

describe('fetchSuggest actions', () => {
  describe('fetchSuggest', () => {
    it('returns a promise', () => {
      fetchSuggest(query, lang);

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(`/api/v3/suggest`, {
        params: { l: lang, q: query },
      });
    });
  });
});
