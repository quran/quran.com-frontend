import cookie from 'react-cookie';

const TOGGLE_READING_MODE = '@@quran/options/TOGGLE_READING_MODE';
const SET_OPTION = '@@quran/options/SET_OPTION';

const initialState = {
  isReadingMode: false,
  isShowingSurahInfo: false,
  audio: 8,
  quran: 1,
  content: [19],
  tooltip: 'translation',
  fontSize: {
    arabic: 3.5,
    translation: 2
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_READING_MODE:
      return {
        ...state,
        isReadingMode: !state.isReadingMode
      };
    case SET_OPTION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export function isReadingMode(globalState) {
  return globalState.options.isReadingMode;
}

export function setOption(payload) {
  const options = cookie.load('options') || {}; // protect against first timers.
  Object.keys(payload).forEach(option => { options[option] = payload[option]; });
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
