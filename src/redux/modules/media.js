import {
  SET_MEDIA,
  REMOVE_MEDIA,
  LOAD_TAFISRS,
  LOAD_TAFISRS_SUCCESS
} from 'redux/constants/media';

import { buildTafsirList } from 'helpers/tafsirs';

const initialState = {
  content: { title: null, body: null },
  show: false,
  loading: false,
  size: 'large'
};

export default function reducer(state = initialState, action = {}) {
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
      return {
        ...state,
        show: true,
        loading: true,
        size: 'small',
        content: {
          title: 'Select a tafsir'
        }
      };
    }
    case LOAD_TAFISRS_SUCCESS: {
      return {
        ...state,
        show: true,
        loading: false,
        content: {
          title: 'Select a tafsir',
          body: buildTafsirList(action.result.tafsirs, action.verse)
        }
      };
    }
    default:
      return state;
  }
}
