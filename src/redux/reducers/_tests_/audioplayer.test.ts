import audioplayer, { INITIAL_STATE } from '../audioplayer';
import {
  SET_CURRENT_WORD,
  SET_CURRENT_VERSE_KEY,
  PLAY_CURRENT_WORD,
  PLAY,
  PAUSE,
  SET_REPEAT,
  TOGGLE_SCROLL,
  UPDATE,
  FETCH_AUDIOPLAYER,
} from '../../constants/audioplayer';

describe('audioplayer reducer', () => {
  it('returns default state', () => {
    expect(audioplayer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('responses to UPDATE', () => {
    const payload = { a: 1 };

    expect(
      audioplayer(INITIAL_STATE, {
        type: UPDATE,
        payload,
      })
    ).toEqual({ ...INITIAL_STATE, ...payload });
  });

  it('responses to PLAY', () => {
    expect(
      audioplayer(INITIAL_STATE, {
        type: PLAY,
      })
    ).toEqual({ ...INITIAL_STATE, isPlaying: true });
  });

  it('responses to PLAY with payload', () => {
    const payload = '1:1';

    expect(
      audioplayer(INITIAL_STATE, {
        type: PLAY,
        payload,
      })
    ).toEqual({ ...INITIAL_STATE, isPlaying: true, currentVerseKey: payload });
  });

  it('responds to PAUSE', () => {
    expect(
      audioplayer(
        { ...INITIAL_STATE, isPlaying: true },
        {
          type: PAUSE,
        }
      )
    ).toEqual({ ...INITIAL_STATE, isPlaying: false });
  });

  it('responses to SET_REPEAT', () => {
    const payload = { from: 1, to: 2 };

    expect(
      audioplayer(INITIAL_STATE, {
        type: SET_REPEAT,
        payload,
      })
    ).toEqual({ ...INITIAL_STATE, repeat: payload });
  });

  it('responses to TOGGLE_SCROLL', () => {
    expect(
      audioplayer(INITIAL_STATE, {
        type: TOGGLE_SCROLL,
      })
    ).toEqual({ ...INITIAL_STATE, shouldScroll: false });
  });
});
