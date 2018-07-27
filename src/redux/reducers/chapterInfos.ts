import { camelizeKeys } from 'humps';
import { handle } from 'redux-pack';

import { FETCH_CHAPTER_INFO } from '../constants/chapterInfos';

export const INITIAL_STATE = {
  errored: false,
  isLoading: false,
  entities: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_CHAPTER_INFO: {
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
        }),
        finish: prevState => ({
          ...prevState,
          isLoading: false,
        }),
        success: prevState => ({
          ...prevState,
          entities: {
            ...state.entities,
            [action.meta.chapterId]: camelizeKeys(action.payload.chapter_info),
          },
        }),
      });
    }

    default:
      return state;
  }
};
