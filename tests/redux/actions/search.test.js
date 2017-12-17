import { SEARCH, SEARCH_SUCCESS, SEARCH_FAIL } from 'redux/constants/search.js';
import * as searchActions from '../../../src/redux/actions/search.js';

describe('search', () => {
  it('actions', () => {
    expect(searchActions.search().types.length).toEqual(3);
    expect(searchActions.search().types).toEqual([
      SEARCH,
      SEARCH_SUCCESS,
      SEARCH_FAIL
    ]);
  });
});
