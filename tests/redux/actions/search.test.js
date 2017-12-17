import { SEARCH, SEARCH_SUCCESS, SEARCH_FAIL } from 'redux/constants/search.js';
import { search } from '../../../src/redux/actions/search.js';

describe('search', () => {
  it('actions', () => {
    expect(search().types.length).toEqual(3);
    expect(search().types).toEqual([SEARCH, SEARCH_SUCCESS, SEARCH_FAIL]);
  });
});
