import {
  SET_CURRENT_FILE,
  SET_CURRENT_WORD,
  PLAY,
  PAUSE,
  NEXT,
  PREVIOUS,
  SET_REPEAT,
  TOGGLE_SCROLL,
  BUILD_ON_CLIENT,
  UPDATE
} from '../../../src/redux/constants/audioplayer';

import {
  setCurrentFile,
  setCurrentWord,
  play,
  pause,
  next,
  previous,
  setRepeat,
  toggleScroll,
  buildOnClient,
  update
} from '../../../src/redux/actions/audioplayer';

describe('audoplayer', () => {
  it('actions', () => {
    fetch.mockResponse(JSON.stringify({}));
    expect(setCurrentFile('fil').type).toEqual(SET_CURRENT_FILE);
    expect(setCurrentWord('word').type).toEqual(SET_CURRENT_WORD);
    expect(play().type).toEqual(PLAY);
    expect(pause().type).toEqual(PAUSE);
    expect(next('abc').type).toEqual(NEXT);
    expect(previous('abc').type).toEqual(PREVIOUS);
    expect(setRepeat('abc').type).toEqual(SET_REPEAT);
    expect(toggleScroll().type).toEqual(TOGGLE_SCROLL);
    expect(buildOnClient('abc').type).toEqual(BUILD_ON_CLIENT);
    expect(update('abc').type).toEqual(UPDATE);
  });
});
