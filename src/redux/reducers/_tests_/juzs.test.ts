import juzs, { INITIAL_STATE } from '../juzs';

describe('juzs reducer', () => {
  it('returns default state', () => {
    expect(juzs(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
