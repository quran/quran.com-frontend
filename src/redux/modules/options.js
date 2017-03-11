import {
  SET_OPTION,
  LOAD_RECITERS,
  LOAD_RECITERS_SUCCESS,
  SET_USER_AGENT
} from 'redux/constants/options.js';

const initialState = {
  isReadingMode: false,
  isShowingSurahInfo: false,
  loadingRecitations: false,
  audio: 8,
  translations: [20],
  tooltip: 'translation',
  userAgent: null,
  options: {
    recitations: []
  },
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
    case LOAD_RECITERS: {
      return {
        ...state,
        loadingRecitations: true
      };
    }
    case LOAD_RECITERS_SUCCESS: {
      return {
        ...state,
        loadingRecitations: false,
        options: {
          ...state.options,
          recitations: action.result.recitations
        }
      };
    }
    case SET_USER_AGENT: {
      const { userAgent } = action;
      return {
        ...state,
        userAgent
      };
    }
    default:
      return state;
  }
}
