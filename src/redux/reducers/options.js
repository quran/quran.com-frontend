import cookie from 'react-cookie';
import { handleActions } from 'redux-actions';

import {
  SET_OPTION,
  SET_USER_AGENT,
  FETCH_RECITERS,
  FETCH_TRANSLATIONS
} from '../constants/options.js';

const options = cookie.load('options') || {};

export const INITIAL_STATE = {
  isReadingMode: options.isReadingMode || false,
  isNightMode: options.isNightMode || false,
  isShowingSurahInfo: options.isShowingSurahInfo || false,
  audio: options.audio || 7, // Mishari Rashid al-`Afasy
  translations: options.translations || [102], // Clear Quran with footnotes
  tooltip: options.tooltip || 'translation',
  fontSize: options.fontSize || {
    arabic: 3.5,
    translation: 2
  },
  userAgent: null,
  options: {
    recitations: [],
    translations: []
  },
  loadingRecitations: false,
  loadingTranslations: false
};

export default handleActions(
  {
    [SET_OPTION]: (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        ...payload
      };
    },
    [FETCH_RECITERS.ACTION]: state => ({
      ...state,
      loadingRecitations: true
    }),
    [FETCH_RECITERS.SUCCESS]: (state, action) => ({
      ...state,
      loadingRecitations: false,
      options: {
        ...state.options,
        recitations: action.result.recitations
      }
    }),
    [SET_USER_AGENT]: (state, action) => {
      const { userAgent } = action;
      return {
        ...state,
        userAgent
      };
    },
    [FETCH_TRANSLATIONS.ACTION]: state => ({
      ...state,
      loadingTranslations: true
    }),
    [FETCH_TRANSLATIONS.SUCCESS]: (state, action) => ({
      ...state,
      loadingTranslations: false,
      options: {
        ...state.options,
        translations: action.result.translations
      }
    })
  },
  INITIAL_STATE
);
