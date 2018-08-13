import lines, { INITIAL_STATE } from '../lines';

describe('lines reducer', () => {
  it('returns default state', () => {
    expect(lines(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
