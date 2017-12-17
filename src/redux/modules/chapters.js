import { handleActions } from 'redux-actions';

import {
  FETCH_CHAPTERS,
  FETCH_CHAPTER_INFO,
  SET_CURRENT
} from 'redux/constants/chapters';

const INITIAL_STATE = {
  errored: false,
  loaded: false,
  loading: false,
  infoLoading: false,
  current: null,
  entities: {},
  infos: {}
};

export default handleActions(
  {
    [FETCH_CHAPTERS.SUCCESS]: (state, action) => {
      const entities = state.entities;
      const { chapters } = action.result.entities;
      return {
        ...state,
        loaded: true,
        errored: false,
        entities: {
          ...entities,
          ...chapters
        }
      };
    },
    [FETCH_CHAPTERS.SUCCESS]: state => state,
    [FETCH_CHAPTER_INFO.ACTION]: state => ({
      ...state,
      infoLoading: true
    }),
    [FETCH_CHAPTER_INFO.SUCCESS]: (state, action) => ({
      ...state,
      infos: {
        ...state.entities,
        [action.id]: action.result.chapterInfo
      }
    }),
    [SET_CURRENT.ACTION]: (state, action) => ({
      ...state,
      current: action.current
    })
  },
  INITIAL_STATE
);
