import { suggest } from '../suggest';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

const lang = 'en';
const query = 'Noah';

describe('suggest actions', () => {
  describe('suggest', () => {
    it('returns a promise', () => {
      suggest(query, lang);

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(`/api/v3/suggest`, {
        params: { l: lang, q: query },
      });
    });
  });
});
