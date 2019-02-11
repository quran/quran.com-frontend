import { handle } from 'redux-pack';
import camelcaseKeys from 'camelcase-keys';
import { FETCH_FOOT_NOTE } from '../constants/footNotes';
import { FootNoteShape } from '../../shapes';

type State = {
  isLoading: boolean;
  entities: { [chapterId: string]: FootNoteShape | undefined };
};

export const INITIAL_STATE: State = {
  isLoading: false,
  entities: {},
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case FETCH_FOOT_NOTE: {
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
            [action.meta.verseKey]: camelcaseKeys(
              action.payload.foot_note || {},
              { deep: true }
            ),
          },
        }),
      });
    }
    default:
      return state;
  }
};
