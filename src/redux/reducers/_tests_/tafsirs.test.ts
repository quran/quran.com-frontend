import tafsirs, { INITIAL_STATE } from '../tafsirs';

describe('tafsirs reducer', () => {
  it('returns default state', () => {
    expect(tafsirs(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
