import verses, { INITIAL_STATE } from '../verses';

describe('verses reducer', () => {
  it('returns default state', () => {
    expect(verses(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
