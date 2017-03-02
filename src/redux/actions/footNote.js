import { footNoteSchema } from 'redux/schemas';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
} from 'redux/constants/footNote.js';

export function load(id) {
  console.info("load is called buddy");
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: { footNote: footNoteSchema },
    promise: client => client.get(`/api/v3/foot_notes/${id}`),
    id: id
  };
}
