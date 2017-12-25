import searchReducer, {
  INITIAL_STATE
} from '../../../src/redux/reducers/searchResults';
import { SEARCH } from '../../../src/redux/constants/search';

describe('searchReducer reducer', () => {
  describe('SEARCH.ACTION', () => {
    it('reduces', () => {
      expect(
        searchReducer(INITIAL_STATE, {
          type: SEARCH.ACTION
        })
      ).toEqual({ ...INITIAL_STATE, loaded: false, loading: true });
    });
  });

  describe('SEARCH.SUCCESS', () => {
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
          type: SEARCH.SUCCESS,
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

  describe('SEARCH.FAILURE', () => {
    it('reduces', () => {
      expect(
        searchReducer(INITIAL_STATE, {
          type: SEARCH.FAILURE
        })
      ).toEqual({ ...INITIAL_STATE, errored: true });
    });
  });
});
