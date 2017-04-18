import cookie from 'react-cookie';
import {
  SET_OPTION,
  LOAD_RECITERS,
  LOAD_RECITERS_SUCCESS,
  LOAD_RECITERS_FAIL,
  SET_USER_AGENT,
  LOAD_TRANSLATIONS,
  LOAD_TRANSLATIONS_SUCCESS,
  LOAD_TRANSLATIONS_FAIL
} from 'redux/constants/options.js';

export function isReadingMode(globalState) {
  return globalState.options.isReadingMode;
}

export function isNightMode(globalState) {
  return globalState.options.isNightMode;
}

export function setOption(payload) {
  const options = cookie.load('options') || {}; // protect against first timers.

  Object.keys(payload).forEach((option) => {
    options[option] = payload[option];
  });
  cookie.save('options', JSON.stringify(options));

  return {
    type: SET_OPTION,
    payload
  };
}

export function setUserAgent(userAgent) {
  return {
    type: SET_USER_AGENT,
    userAgent
  };
}

export const loadTranslations = () => ({
  types: [LOAD_TRANSLATIONS, LOAD_TRANSLATIONS_SUCCESS, LOAD_TRANSLATIONS_FAIL],
  promise: client => client.get('/api/v3/options/translations')
});

export const loadRecitations = () => ({
  types: [LOAD_RECITERS, LOAD_RECITERS_SUCCESS, LOAD_RECITERS_FAIL],
  promise: client => client.get('/api/v3/options/recitations')
});
