import {
  LOAD_FOOT_NOTE,
  LOAD_FOOT_NOTE_SUCCESS,
  REMOVE_FOOT_NOTE
} from 'redux/constants/footNote.js';

const initialState = {
  footNote: null,
  loadingFootNote: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FOOT_NOTE: {
      return {
        ...state,
        loadingFootNote: true,
        footNote: null,
      };
    }
    case LOAD_FOOT_NOTE_SUCCESS: {
      return {
        ...state,
        loadingFootNote: false,
        footNote: action.result.footNote
      };
    }
    case REMOVE_FOOT_NOTE: {
      return {
        ...state,
        loadingFootNote: false,
        footNote: null,
      };
    }
    default:
      return state;
  }
}
