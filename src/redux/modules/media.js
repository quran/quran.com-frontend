import {
  SET_MEDIA,
  REMOVE_MEDIA
} from 'redux/constants/media';

const initialState = {
  content: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_MEDIA: {
      return {
        ...state,
        content: action.content
      };
    }
    case REMOVE_MEDIA: {
      return {
        ...state,
        content: null
      };
    }
    default:
      return state;
  }
}
