import { handle } from 'redux-pack';
import camelcaseKeys from 'camelcase-keys';
import { FETCH_TAFSIR } from '../constants/tafsirs';

type State = {
  isLoading: boolean;
  entities: $TsFixMe;
};

export const INITIAL_STATE: State = {
  isLoading: false,
  entities: {},
};

export default (state: State = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_TAFSIR:
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
            [action.meta.verseKey]: camelcaseKeys(action.payload.tafsirs),
          },
        }),
      });
    default:
      return state;
  }
};
