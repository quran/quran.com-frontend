import chapterInfos, { INITIAL_STATE } from '../chapterInfos';

describe('chapterInfos reducer', () => {
  it('returns default state', () => {
    expect(chapterInfos(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });
});
