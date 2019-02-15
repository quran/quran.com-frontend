import { fetchVerses } from '../verses';
import apiClient from '../../../apiClient';
import { INITIAL_STATE } from '../../reducers/settings';

jest.mock('../../../apiClient.ts');

const chapterId = 1;
const paging = { offset: 1, limit: 1 };

describe('verses action', () => {
  describe('fetchVerses', () => {
    it('returns a promise', () => {
      fetchVerses(chapterId, {}, {}, INITIAL_STATE);

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(
        `/api/v3/chapters/${chapterId}/verses`,
        {
          params: { translations: INITIAL_STATE.translations },
        }
      );
    });

    it('sets the correct paging params', () => {
      fetchVerses(chapterId, paging, {}, INITIAL_STATE);

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(
        `/api/v3/chapters/${chapterId}/verses`,
        {
          params: { translations: INITIAL_STATE.translations, ...paging },
        }
      );
    });
  });
});
