import { LOAD_SUCCESS } from '../constants/ayahsActionTypes.js';
import { SEARCH_SUCCESS } from '../constants/searchActionTypes.js';
import { LOAD } from '../constants/fontFaceActionTypes.js';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
    case SEARCH_SUCCESS:
      const ayahs = action.result.entities.ayahs;
      const classNames = {};

      Object.keys(ayahs).forEach(ayahId => {
        const ayah = ayahs[ayahId];

        if (!state[`p${ayah.pageNum}`]) {
          classNames[`p${ayah.pageNum}`] = false;
        }
      });

      return {
        ...state,
        ...classNames
      };

    case LOAD:
      return {
        ...state,
        [action.className]: true
      };
    default:
      return state;
  }
}
