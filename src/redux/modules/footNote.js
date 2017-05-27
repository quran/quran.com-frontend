import {
  LOAD_FOOT_NOTE,
  LOAD_FOOT_NOTE_SUCCESS
} from 'redux/constants/footNote.js';

const initialState = {
  content: { title: null, body: null },
  show: false,
  loading: false,
  size: 'large'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FOOT_NOTE: {
      return {
        ...state,
        show: true,
        loading: true,
        content: { title: 'Foot note' }
      };
    }
    case LOAD_FOOT_NOTE_SUCCESS: {
      return {
        ...state,
        loading: false,
        content: { body: action.result.footNote.text }
      };
    }
    default:
      return state;
  }
}
