
import { TOGGLE_READING_MODE, SET_OPTION } from 'redux/constants/options.js';

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
    case TOGGLE_READING_MODE: {
      return {
        ...state,
        isReadingMode: !state.isReadingMode
      };
    }
    case SET_OPTION: {
      const payload = action.payload;
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
}
