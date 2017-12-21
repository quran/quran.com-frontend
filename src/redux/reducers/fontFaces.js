import { LOAD_SUCCESS } from '../constants/verses';
import { SEARCH_SUCCESS } from '../constants/search';
import LOAD from '../constants/fontFace';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
    case SEARCH_SUCCESS: {
      const verses = action.result.entities.verses;
      const classNames = {};

      if (verses) {
        Object.keys(verses).forEach((ayahId) => {
          const verse = verses[ayahId];

          if (!state[`p${verse.pageNumber}`]) {
            classNames[`p${verse.pageNumber}`] = false;
          }
        });
      }

      return {
        ...state,
        ...classNames
      };
    }
    case LOAD:
      return {
        ...state,
        [action.className]: true
      };
    default:
      return state;
  }
}
