import { LOAD_SUCCESS } from './ayahs';
import { SEARCH_SUCCESS } from './searchResults';

export const LOAD = '@@quran/fontFaces/LOAD';

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

export function load(className) {
  return {
    type: LOAD,
    className
  };
}
