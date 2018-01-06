import { SEARCH } from 'redux/constants/search';
import { search } from '../../../src/redux/actions/search';

const params = {
  q: 'query',
  p: 1
};

describe('search', () => {
  it('actions', () => {
    fetch.mockResponse(JSON.stringify({}));
    expect(search(params).types.length).toEqual(3);
    expect(search(params).types).toEqual([
      SEARCH.ACTION,
      SEARCH.SUCCESS,
      SEARCH.FAILURE
    ]);
  });
});
