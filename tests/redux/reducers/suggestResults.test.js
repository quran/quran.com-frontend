import searchResultsReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/suggestResults';
import { SUGGEST } from '../../../src/redux/constants/suggest';

describe('searchResults reducer', () => {
  describe('SUGGEST', () => {
    it('reduces', () => {
      expect(
        searchResultsReducer(INITIAL_STATE, {
          type: SUGGEST.ACTION
        })
      ).toEqual({ ...INITIAL_STATE, loaded: false, loading: true });
    });
  });

  describe('SUGGEST.SUCCESS', () => {
    it('reduces', () => {
      const result = [{ text: '1' }, { text: '2' }];
      const query = 'query';
      expect(
        searchResultsReducer(INITIAL_STATE, {
          type: SUGGEST.SUCCESS,
          result,
          query
        })
      ).toEqual({
        ...INITIAL_STATE,
        loaded: true,
        loading: false,
        results: {
          [query]: result
        }
      });
    });
  });

  describe('SUGGEST.FAILURE', () => {
    it('reduces', () => {
      expect(
        searchResultsReducer(INITIAL_STATE, {
          type: SUGGEST.FAILURE
        })
      ).toEqual({ ...INITIAL_STATE, errored: true });
    });
  });
});
