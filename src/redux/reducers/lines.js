/* eslint-disable no-case-declarations */
import {
  LOAD as AYAHS_LOAD,
  LOAD_SUCCESS as AYAHS_LOAD_SUCCESS,
  LOAD_FAIL as AYAHS_LOAD_FAIL
} from 'redux/constants/verses.js';

import { SET_CURRENT as SURAHS_SET_CURRENT } from 'redux/constants/chapters.js';

const initialState = {
  lines: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SURAHS_SET_CURRENT:
      return {
        ...state,
        lines: {}
      };
    case AYAHS_LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case AYAHS_LOAD_SUCCESS:
      const ayahs = action.result.entities.verses;
      const stateLines = state.lines;
      const lines = { ...stateLines };

      action.result.result.verses.forEach((ayahId) => {
        const ayah = ayahs[ayahId];

        ayah.words.forEach((word) => {
          if (lines[`${word.pageNumber}-${word.lineNumber}`]) {
            const isInArray = lines[
              `${word.pageNumber}-${word.lineNumber}`
            ].find((item) => {
              const itemChecksum = `${item.lineNumber}${item.code}${
                item.verseKey
              }${item.position}`;
              const dataChecksum = `${word.lineNumber}${word.code}${
                word.verseKey
              }${item.position}`;

              return itemChecksum === dataChecksum;
            });

            if (!isInArray) {
              lines[`${word.pageNumber}-${word.lineNumber}`].push(word);
            }
          } else {
            lines[`${word.pageNumber}-${word.lineNumber}`] = [word];
          }
        });
      });

      return {
        ...state,
        loaded: true,
        loading: false,
        errored: false,
        lines
      };
    case AYAHS_LOAD_FAIL:
      return state;
    default:
      return state;
  }
}
