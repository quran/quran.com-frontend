import { LOAD_SUCCESS } from 'redux/constants/verses.js';
// import { SEARCH_SUCCESS } from 'redux/constants/search.js';
import LOAD from 'redux/constants/fontFace.js';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS: {
      const verses = action.result.entities.verses;
      const classNames = {};

      Object.keys(verses).forEach((ayahId) => {
        const verse = verses[ayahId];

        if (!state[`p${verse.pageNumber}`]) {
          classNames[`p${verse.pageNumber}`] = false;
        }
      });

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
