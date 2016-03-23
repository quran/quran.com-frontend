/* eslint-disable no-case-declarations */
import {
  LOAD as AYAHS_LOAD,
  LOAD_SUCCESS as AYAHS_LOAD_SUCCESS,
  LOAD_FAIL as AYAHS_LOAD_FAIL
} from './ayahs';

const initialState = {
  lines: [],
  lastLine: -1
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AYAHS_LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case AYAHS_LOAD_SUCCESS:
      const ayahs = action.result.entities.ayahs;
      const lines = [];
      let lastLine = -1;

      action.result.result.forEach(ayahId => {
        const ayah = ayahs[ayahId];

        ayah.quran.forEach(data => {
          if (data.char.line !== lastLine) {
            // new line
            lines[lines.length] = [];
            lastLine = data.char.line;
          }
          lines[lines.length - 1].push(data);
        });
      });

      return {
        ...state,
        loaded: true,
        loading: false,
        errored: false,
        lines,
        lastLine
      };
    case AYAHS_LOAD_FAIL:
      console.log(action);
      return state;
    default:
      return state;
  }
}
