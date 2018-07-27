import { handle } from 'redux-pack';
import keyBy from 'lodash/keyBy';
import { camelizeKeys } from 'humps';

import { FETCH_JUZS } from '../constants/juzs';

export const INITIAL_STATE = {
  errored: false,
  loaded: false,
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
          loaded: true,
          entities: {
            ...state.entities,
            ...camelizeKeys(keyBy(action.payload.juzs, 'id')),
          },
        }),
      });
    }

    default:
      return state;
  }
};
