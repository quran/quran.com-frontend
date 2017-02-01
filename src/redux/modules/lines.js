/* eslint-disable no-case-declarations */
import {
  LOAD as AYAHS_LOAD,
  LOAD_SUCCESS as AYAHS_LOAD_SUCCESS,
  LOAD_FAIL as AYAHS_LOAD_FAIL,
  } from 'redux/constants/ayahs.js';

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
      const ayahs = action.result.entities.ayahs;
      const stateLines = state.lines;
      const lines = { ...stateLines };

      action.result.result.forEach((ayahId) => {
        const ayah = ayahs[ayahId];

        ayah.words.forEach((word) => {
          if (lines[`${word.pageNum}-${word.lineNum}`]) {
            const isInArray = lines[`${word.pageNum}-${word.lineNum}`].find((item) => {
              const itemChecksum = `${item.lineNum}${item.code}${item.ayahKey}${item.position}`;
              const dataChecksum = `${word.lineNum}${word.code}${word.ayahKey}${item.position}`;

              return itemChecksum === dataChecksum;
            });

            if (!isInArray) {
              lines[`${word.pageNum}-${word.lineNum}`].push(word);
            }
          } else {
            lines[`${word.pageNum}-${word.lineNum}`] = [word];
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
