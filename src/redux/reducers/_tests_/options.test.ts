import options, { INITIAL_STATE } from '../options';

describe('options reducer', () => {
  it('returns default state', () => {
    expect(options(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
