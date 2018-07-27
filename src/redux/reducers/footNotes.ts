import { handle } from 'redux-pack';
import { FETCH_FOOT_NOTE } from '../constants/footNotes';

export const INITIAL_STATE = {
  isLoading: false,
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
          isLoading: false,
          size: 'large',
          wrapperClass: 'text-translation foote-note-text',
          content: {
            body: `<small class='${action.result.footNote.languageName}'>${
              action.result.footNote.text
            }</small>`,
            title: 'Foot note',
          },
        }),
      });
    }
    default:
      return state;
  }
};
