import cookie from 'react-cookie';
import merge from 'lodash/merge';
import { COOKIE_SETTINGS_KEY } from '../../constants/index';
import { SET_OPTION, SET_USER_AGENT } from '../constants/settings';

type FontSize = {
  arabic?: number;
  translation?: number;
};

type Payload = {
  audio?: number;
  translations?: Array<number>;
  tooltip?: 'translation' | 'transliteration';
  fontSize?: FontSize;
  isShowingChapterInfo?: boolean;
};

export const setSetting = (payload: Payload) => {
  const options = cookie.load(COOKIE_SETTINGS_KEY) || {}; // protect against first timers.

  merge(options, payload);

  cookie.save(COOKIE_SETTINGS_KEY, JSON.stringify(options));

  return {
    type: SET_OPTION,
    payload,
  };
};

export const setUserAgent = (userAgent: $TsFixMe) => ({
  type: SET_USER_AGENT,
  payload: userAgent,
});

export type SetSetting = typeof setSetting;
