
import { SET_OPTION } from 'redux/constants/options.js';

const initialState = {
  isReadingMode: false,
  isShowingSurahInfo: false,
  audio: 8,
  content: [20],
  tooltip: 'translation',
  fontSize: {
    arabic: 3.5,
    translation: 2
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
