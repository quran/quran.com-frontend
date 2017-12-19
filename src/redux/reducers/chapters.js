import { handleActions } from 'redux-actions';

import {
  FETCH_CHAPTERS,
  FETCH_CHAPTER_INFO,
  SET_CURRENT
} from 'redux/constants/chapters';

export const INITIAL_STATE = {
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
    [FETCH_CHAPTERS.SUCCESS]: (state, { result }) => {
      const { chapters } = result.entities;

      return {
        ...state,
        loaded: true,
        errored: false,
        entities: { ...state.entities, ...chapters }
      };
    },
    [FETCH_CHAPTERS.FAILURE]: state => ({ ...state, errored: true }),
    [FETCH_CHAPTER_INFO.ACTION]: state => ({
      ...state,
      infoLoading: true
    }),
    [FETCH_CHAPTER_INFO.SUCCESS]: (state, { id, result }) => ({
      ...state,
      infos: {
        ...state.entities,
        [id]: result.chapterInfo
      }
    }),
    [SET_CURRENT.ACTION]: (state, { current }) => ({
      ...state,
      current
    })
  },
  INITIAL_STATE
);
