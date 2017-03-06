import cookie from 'react-cookie';
import {
  SET_OPTION,
  LOAD_RECITERS,
  LOAD_RECITERS_SUCCESS,
  LOAD_RECITERS_FAIL
} from 'redux/constants/options.js';

export function isReadingMode(globalState) {
  return globalState.options.isReadingMode;
}

export function setOption(payload) {
  const options = cookie.load('options') || {}; // protect against first timers.

  Object.keys(payload).forEach((option) => { options[option] = payload[option]; });
  cookie.save('options', JSON.stringify(options));

  return {
    type: SET_OPTION,
    payload
  };
}

export const loadRecitations = () => ({
  types: [LOAD_RECITERS, LOAD_RECITERS_SUCCESS, LOAD_RECITERS_FAIL],
  promise: client => client.get('/api/v3/options/recitations')
});
