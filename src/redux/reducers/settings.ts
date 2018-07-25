import cookie from 'react-cookie';

import { SET_OPTION, SET_USER_AGENT } from '../constants/settings';

const options = cookie.load('options') || {};

type FontSize = {
  arabic: number;
  translation: number;
};

type State = {
  isReadingMode: boolean;
  isNightMode: boolean;
  isShowingChapterInfo: boolean;
  audio: number;
  translations: Array<number>;
  tooltip: 'translation' | 'transliteration';
  fontSize: FontSize;
  userAgent: $TsFixMe;
};

export const INITIAL_STATE: State = {
  isReadingMode: options.isReadingMode || false,
  isNightMode: options.isNightMode || false,
  isShowingChapterInfo: options.isShowingChapterInfo || false,
  audio: options.audio || 7, // Mishari Rashid al-`Afasy
  translations: options.translations || [102], // Clear Quran with footnotes
  tooltip: options.tooltip || 'translation',
  fontSize: options.fontSize || {
    arabic: 3.5,
    translation: 2,
  },
  userAgent: null,
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case SET_OPTION: {
      const { payload } = action;

      return {
        ...state,
        ...payload,
      };
    }
    case SET_USER_AGENT: {
      const { userAgent } = action;

      return {
        ...state,
        userAgent,
      };
    }
    default:
      return state;
  }
};
