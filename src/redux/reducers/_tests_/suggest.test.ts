import suggest, { INITIAL_STATE } from '../suggest';

describe('suggest reducer', () => {
  it('returns default state', () => {
    expect(suggest(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
