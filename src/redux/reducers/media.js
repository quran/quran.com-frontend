import {
  SET_MEDIA,
  REMOVE_MEDIA,
  LOAD_TAFISRS,
  LOAD_TAFISRS_SUCCESS,
  LOAD_FOOT_NOTE,
  LOAD_FOOT_NOTE_SUCCESS
} from 'redux/constants/media';

import { buildTafsirList } from 'helpers/tafsirs';

const initialState = {
  content: { title: null, body: null },
  show: false,
  loading: false,
  size: 'large',
  wrapperClass: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_MEDIA: {
      return {
        ...state,
        show: true,
        size: 'large',
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
        wrapperClass: '',
        content: {
          title: action.title
        }
      };
    }
    case LOAD_TAFISRS_SUCCESS: {
      return {
        ...state,
        loading: false,
        content: {
          body: buildTafsirList(action.result.tafsirs, action.verse),
          title: action.title
        }
      };
    }
    case LOAD_FOOT_NOTE: {
      return {
        ...state,
        show: true,
        loading: true,
        content: {
          title: 'Foot note'
        }
      };
    }
    case LOAD_FOOT_NOTE_SUCCESS: {
      return {
        ...state,
        loading: false,
        size: 'large',
        wrapperClass: 'text-translation foote-note-text',
        content: {
          body: `<small class='${action.result.footNote.languageName}'>${action
            .result.footNote.text}</small>`,
          title: 'Foot note'
        }
      };
    }
    default:
      return state;
  }
}
