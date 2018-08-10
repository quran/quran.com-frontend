import { handle } from 'redux-pack';
import camelcaseKeys from 'camelcase-keys';
import keyBy from 'lodash/keyBy';

import { FETCH_CHAPTERS } from '../constants/chapters';
import { ChapterShape } from '../../shapes';

type State = {
  error: $TsFixMe;
  isLoading: boolean;
  entities: { [chapterId: string]: ChapterShape };
};

export const INITIAL_STATE: State = {
  error: false,
  isLoading: false,
  entities: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_CHAPTERS: {
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
            ...prevState.entities,
            ...camelcaseKeys(keyBy(action.payload.chapters, 'id')),
          },
        }),
      });
    }
    default:
      return state;
  }
};
