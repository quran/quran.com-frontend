import { handleActions } from 'redux-actions';

import { LOAD_SUCCESS } from '../constants/verses';
import { SEARCH } from '../constants/search';
import FONT_FACE from '../constants/fontFace';
import { INITIAL_STATE } from './juzs';

const success = (state, action) => {
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
};

export default handleActions(
  {
    [LOAD_SUCCESS]: success,
    [SEARCH.SUCCESS]: success,
    [FONT_FACE.ACTION]: (state, action) => ({
      ...state,
      [action.className]: true
    })
  },
  INITIAL_STATE
);
