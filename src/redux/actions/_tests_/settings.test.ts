import cookie from 'react-cookie';
import { setSetting, setUserAgent } from '../settings';
import { COOKIE_SETTINGS_KEY } from '../../../constants/index';

jest.mock('react-cookie');

const audio = 9;

describe('settings actions', () => {
  describe('setSetting', () => {
    it('returns a promise', () => {
      setSetting({
        audio,
      });

      expect(cookie.save).toHaveBeenCalled();
      expect(cookie.save).toHaveBeenCalledWith(
        COOKIE_SETTINGS_KEY,
        JSON.stringify({ audio })
      );
    });
  });

  describe('setUserAgent', () => {
    it('returns a promise', () => {
      const userAgent = {
        isMobile: true,
      };
      const returned = setUserAgent(userAgent);

      expect(returned).toHaveProperty('payload', userAgent);
    });
  });
});
