import { SET_MEDIA, REMOVE_MEDIA } from '../constants/media';

const INITIAL_STATE = {
  content: { title: '', body: '' },
  show: false,
  loading: false,
  size: 'large',
  wrapperClass: '',
};

export default (state = INITIAL_STATE, action: $TsFixMe) => {
  switch (action.type) {
    case SET_MEDIA: {
      return {
        ...state,
        show: true,
        size: 'large',
        content: {
          title: action.content.authorName,
          body: action.content.embedText,
        },
      };
    }
    case REMOVE_MEDIA: {
      return {
        ...state,
        show: false,
        content: { title: null, body: null },
      };
    }
    default:
      return state;
  }
};
