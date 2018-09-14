import { FETCH_FOOT_NOTE } from '../constants/footNotes';
import apiClient from '../../apiClient';

type Payload = {
  footNoteId: string | number;
  verseKey: string;
};

export const fetchFootNote = ({ footNoteId, verseKey }: Payload) => ({
  type: FETCH_FOOT_NOTE,
  promise: apiClient.get(`/api/v3/foot_notes/${footNoteId}`),
  meta: {
    verseKey,
  },
});

export type FetchFootNote = typeof fetchFootNote;
