import camelcaseKeys from 'camelcase-keys';
import { handle } from 'redux-pack';

import { FETCH_CHAPTER_INFO } from '../constants/chapterInfos';
import { ChapterInfoShape } from '../../shapes';

type State = {
  errored: $TsFixMe;
  isLoading: boolean;
  entities: { [chapterId: string]: ChapterInfoShape };
};

export const INITIAL_STATE: State = {
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
            [action.meta.chapterId]: camelcaseKeys(
              action.payload.chapter_info || {}
            ),
          },
        }),
      });
    }

    default:
      return state;
  }
};
