import { FETCH_FOOT_NOTE } from '../constants/footNotes';
import apiClient from '../../apiClient';

// eslint-disable-next-line
export const fetchFootNote = (footNoteId: $TsFixMe) => ({
  type: FETCH_FOOT_NOTE,
  promise: apiClient.get(`/api/v3/foot_notes/${footNoteId}`),
});
