import search, { INITIAL_STATE } from '../search';

describe('search reducer', () => {
  it('returns default state', () => {
    expect(search(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
