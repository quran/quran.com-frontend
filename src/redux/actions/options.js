import cookie from 'react-cookie';
import { SET_OPTION } from 'redux/constants/options.js';

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
