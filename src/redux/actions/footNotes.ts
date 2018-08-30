import { FETCH_FOOT_NOTE } from '../constants/footNotes';
import apiClient from '../../apiClient';

export const fetchFootNote = (footNoteId: string) => ({
  type: FETCH_FOOT_NOTE,
  promise: apiClient.get(`/api/v3/foot_notes/${footNoteId}`),
});

export type FetchFootNote = typeof fetchFootNote;
