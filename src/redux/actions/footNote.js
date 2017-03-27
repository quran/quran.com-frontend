import {
  LOAD_FOOT_NOTE,
  LOAD_FOOT_NOTE_SUCCESS,
  REMOVE_FOOT_NOTE,
  LOAD_FOOT_NOTE_FAIL
} from 'redux/constants/footNote.js';

export const loadFootNote = footNoteId => ({
  types: [LOAD_FOOT_NOTE, LOAD_FOOT_NOTE_SUCCESS, LOAD_FOOT_NOTE_FAIL],
  promise: client => client.get(`/api/v3/foot_notes/${footNoteId}`)
});

export const removeFootNote = () => ({
  type: REMOVE_FOOT_NOTE
});
