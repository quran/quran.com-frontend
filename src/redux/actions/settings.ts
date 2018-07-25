import cookie from 'react-cookie';
import { SET_OPTION, SET_USER_AGENT } from '../constants/settings';

export const isReadingMode = (globalState: any) => {
  return !!globalState.options.isReadingMode;
};

export const isNightMode = (globalState: any) => {
  return !!globalState.options.isNightMode;
};

export const setOption = (payload: any) => {
  const options = cookie.load('options') || {}; // protect against first timers.

  Object.keys(payload).forEach(option => {
    options[option] = payload[option];
  });
  cookie.save('options', JSON.stringify(options));

  return {
    type: SET_OPTION,
    payload,
  };
};

export const setUserAgent = (userAgent: string) => {
  return {
    type: SET_USER_AGENT,
    userAgent,
  };
};
