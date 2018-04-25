import { handleActions } from 'redux-actions';

import { FETCH_CHAPTER_INFO } from '../constants/chapterInfos';

export const INITIAL_STATE = {
  errored: false,
  loaded: false,
  loading: false,
  entities: {}
};

export default handleActions(
  {
    [FETCH_CHAPTER_INFO.ACTION]: state => ({
      ...state,
      loading: true
    }),
    [FETCH_CHAPTER_INFO.SUCCESS]: (state, { id, result }) => ({
      ...state,
      loading: false,
      loaded: true,
      entities: {
        ...state.entities,
        [id]: result.chapterInfo
      }
    })
  },
  INITIAL_STATE
);
