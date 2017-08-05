import {
  SET_MEDIA,
  REMOVE_MEDIA,
  LOAD_TAFISRS,
  LOAD_TAFISRS_SUCCESS,
  LOAD_FOOT_NOTE,
  LOAD_FOOT_NOTE_SUCCESS
} from 'redux/constants/media';

export const setMedia = content => ({
  type: SET_MEDIA,
  content
});

export const removeMedia = () => ({
  type: REMOVE_MEDIA
});

export const loadTafsirs = (verse, title) => ({
  types: [LOAD_TAFISRS, LOAD_TAFISRS_SUCCESS],
  promise: client => client.get('/api/v3/options/tafsirs'),
  verse,
  title
});

export const loadFootNote = footNoteId => ({
  types: [LOAD_FOOT_NOTE, LOAD_FOOT_NOTE_SUCCESS],
  promise: client => client.get(`/api/v3/foot_notes/${footNoteId}`)
});
