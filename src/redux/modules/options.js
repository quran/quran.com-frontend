import {
  SET_OPTION,
  LOAD_RECITERS,
  LOAD_RECITERS_SUCCESS,
  SET_USER_AGENT,
  LOAD_TRANSLATIONS,
  LOAD_TRANSLATIONS_SUCCESS
} from 'redux/constants/options.js';

const initialState = {
  isReadingMode: false,
  isNightMode: false,
  isShowingSurahInfo: false,
  loadingRecitations: false,
  loadingTranslations: false,
  audio: 8,
  translations: [20],
  tooltip: 'translation',
  userAgent: null,
  options: {
    recitations: [],
    translations: []
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
    case LOAD_TRANSLATIONS: {
      return {
        ...state,
        loadingTranslations: true
      };
    }
    case LOAD_TRANSLATIONS_SUCCESS: {
      return {
        ...state,
        loadingTranslations: false,
        options: {
          ...state.options,
          translations: action.result.translations
        }
      };
    }
    default:
      return state;
  }
}
