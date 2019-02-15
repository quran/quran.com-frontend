import settings, { INITIAL_STATE } from '../settings';
import { SET_OPTION, SET_USER_AGENT } from '../../constants/settings';

describe('settings reducer', () => {
  it('returns default state', () => {
    expect(settings(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  it('responds to SET_OPTION', () => {
    const payload = { audio: 1 };

    expect(
      settings(INITIAL_STATE, {
        type: SET_OPTION,
        payload,
      })
    ).toEqual({ ...INITIAL_STATE, ...payload });
  });

  it('responds to SET_OPTION', () => {
    const payload = { isMobile: true };

    expect(
      settings(INITIAL_STATE, {
        type: SET_USER_AGENT,
        payload,
      })
    ).toEqual({ ...INITIAL_STATE, userAgent: payload });
  });
});
