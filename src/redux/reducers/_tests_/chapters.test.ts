import chapters, { INITIAL_STATE } from '../chapters';

describe('chapters reducer', () => {
  it('returns default state', () => {
    expect(chapters(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
