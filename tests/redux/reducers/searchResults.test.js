import searchReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/searchResults';
import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAIL
} from '../../../src/redux/constants/search';

describe('searchReducer reducer', () => {
  describe('SEARCH', () => {
    it('reduces', () => {
      expect(
        searchReducer(INITIAL_STATE, {
          type: SEARCH
        })
      ).toEqual({ ...INITIAL_STATE, loaded: false, loading: true });
    });
  });

  describe('SEARCH_SUCCESS', () => {
    it('reduces', () => {
      const result = {
        result: {
          totalCount: 20,
          totalPages: 2,
          currentPage: 1,
          perPage: 10,
          took: 1,
          query: 'search',
          results: []
        },
        entities: { verses: {} }
      };

      expect(
        searchReducer(INITIAL_STATE, {
          type: SEARCH_SUCCESS,
          result
        })
      ).toEqual({
        ...INITIAL_STATE,
        loaded: true,
        loading: false,
        ...result.result,
        entities: {}
      });
    });
  });

  describe('SEARCH_FAIL', () => {
    it('reduces', () => {
      expect(
        searchReducer(INITIAL_STATE, {
          type: SEARCH_FAIL
        })
      ).toEqual({ ...INITIAL_STATE, errored: true });
    });
  });
});
