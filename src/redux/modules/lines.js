/* eslint-disable no-case-declarations */
import {
  LOAD as AYAHS_LOAD,
  LOAD_SUCCESS as AYAHS_LOAD_SUCCESS,
  LOAD_FAIL as AYAHS_LOAD_FAIL
} from './ayahs';

import { SET_CURRENT as SURAHS_SET_CURRENT } from './surahs';

const initialState = {
  lines: {},
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
      const lines = {...state.lines};

      action.result.result.forEach(ayahId => {
        const ayah = ayahs[ayahId];

        ayah.words.forEach(word => {
          if (lines[`${word.pageNum}-${word.lineNum}`]) {
            const isInArray = lines[`${word.pageNum}-${word.lineNum}`].find(item => {
              const itemChecksum = `${item.lineNum}${item.codeHex}${item.ayahKey}${item.position}`;
              const dataChecksum = `${word.lineNum}${word.codeHex}${word.ayahKey}${item.position}`;

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
      console.log(action);
      return state;
    default:
      return state;
  }
}
