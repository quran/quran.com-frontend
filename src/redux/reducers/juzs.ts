import { handle } from 'redux-pack';
import keyBy from 'lodash/keyBy';
import camelcaseKeys from 'camelcase-keys';

import { FETCH_JUZS } from '../constants/juzs';
import { JuzShape } from '../../shapes';

type State = {
  error: $TsFixMe;
  isLoading: boolean;
  entities: { [chapterId: string]: JuzShape };
};

export const INITIAL_STATE: State = {
  error: null,
  isLoading: false,
  entities: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_JUZS: {
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
            ...camelcaseKeys(keyBy(action.payload.juzs, 'id')),
          },
        }),
      });
    }

    default:
      return state;
  }
};
