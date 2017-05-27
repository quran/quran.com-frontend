import {
  SET_MEDIA,
  REMOVE_MEDIA,
  LOAD_TAFISRS,
  LOAD_TAFISRS_SUCCESS
} from 'redux/constants/media';

const initialState = {
  content: { title: null, body: null },
  show: false,
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  if (__CLIENT__) window.media = action;

  switch (action.type) {
    case SET_MEDIA: {
      return {
        ...state,
        show: true,
        content: {
          title: action.content.authorName,
          body: action.content.embedText
        }
      };
    }
    case REMOVE_MEDIA: {
      return {
        ...state,
        show: false,
        content: { title: null, body: null }
      };
    }
    case LOAD_TAFISRS: {
    }
    default:
      return state;
  }
}
