import searchResultsReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/suggestResults';
import {
  SUGGEST,
  SUGGEST_SUCCESS,
  SUGGEST_FAIL
} from '../../../src/redux/constants/suggest';

describe('searchResults reducer', () => {
  describe('SUGGEST', () => {
    it('reduces', () => {
      expect(
        searchResultsReducer(INITIAL_STATE, {
          type: SUGGEST
        })
      ).toEqual({ ...INITIAL_STATE, loaded: false, loading: true });
    });
  });

  describe('SUGGEST_SUCCESS', () => {
    it('reduces', () => {
      const result = [{ text: '1' }, { text: '2' }];
      const query = 'query';
      expect(
        searchResultsReducer(INITIAL_STATE, {
          type: SUGGEST_SUCCESS,
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

  describe('SUGGEST_FAIL', () => {
    it('reduces', () => {
      expect(
        searchResultsReducer(INITIAL_STATE, {
          type: SUGGEST_FAIL
        })
      ).toEqual({ ...INITIAL_STATE, errored: true });
    });
  });
});
