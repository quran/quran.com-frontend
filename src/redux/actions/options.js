import cookie from 'react-cookie';
import { TOGGLE_READING_MODE, SET_OPTION } from 'redux/constants/options.js';

const defaultOptions = {
    isReadingMode: false,
    isShowingSurahInfo: false, // TODO: this shouldn't be an option
    audio: 8,
    quran: 1,
    content: [19],
    tooltip: 'translation',
    fontSize: {
      arabic: 3.5,
      translation: 2
    }
};

export function isReadingMode(globalState) {
  return globalState.options.isReadingMode;
}

export function getOptions() {
  return cookie.load('options') || defaultOptions;
}

export function setOption(payload) {
  const options = getOptions(); // protect against first timers.
  Object.keys(payload).forEach((option) => { options[option] = payload[option]; });
  cookie.save('options', JSON.stringify(options));

  return {
    type: SET_OPTION,
    payload
  };
}

export function toggleReadingMode() {
  return {
    type: TOGGLE_READING_MODE
  };
}
