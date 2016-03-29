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

        ayah.quran.forEach(data => {
          if (lines[`${data.char.page}-${data.char.line}`]) {
            const isInArray = lines[`${data.char.page}-${data.char.line}`].find(item => {
              const itemChecksum = `${item.char.line}${item.word.position}${item.ayahKey}`;
              const dataChecksum = `${data.char.line}${data.word.position}${data.ayahKey}`;

              return itemChecksum === dataChecksum;
            });

            if (!isInArray) {
              lines[`${data.char.page}-${data.char.line}`].push(data);
            }
          } else {
            lines[`${data.char.page}-${data.char.line}`] = [data];
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
