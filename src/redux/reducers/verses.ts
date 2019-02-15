import keyBy from 'lodash/keyBy';
import camelcaseKeys from 'camelcase-keys';
import { handle } from 'redux-pack';

import { FETCH_VERSES } from '../constants/verses';
import { VerseShape } from '../../shapes';

type State = {
  error: $TsFixMe;
  isLoading: boolean;
  entities: { [chapterId: string]: { [verseKey: string]: VerseShape } };
};

export const INITIAL_STATE: State = {
  error: null,
  isLoading: false,
  entities: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_VERSES: {
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
            [action.meta.chapterId]: {
              ...state.entities[action.meta.chapterId],
              ...keyBy(
                camelcaseKeys(action.payload.verses || {}, { deep: true }),
                'verseKey'
              ),
            },
          },
        }),
        failure: prevState => ({
          ...prevState,
          error: action.payload,
        }),
      });
    }

    default:
      return state;
  }
};
