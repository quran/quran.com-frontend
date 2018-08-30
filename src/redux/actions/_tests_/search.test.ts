import { fetchSearch } from '../search';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

const page = 2;
const query = 'Noah';

describe('search actions', () => {
  describe('search', () => {
    it('returns a promise', () => {
      fetchSearch({
        q: query,
        p: page,
      });

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(`/api/v3/search`, {
        params: { p: page, q: query },
      });
    });
  });
});
