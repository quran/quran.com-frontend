import { fetchFootNote } from '../footNotes';
import apiClient from '../../../apiClient';

jest.mock('../../../apiClient.ts');

const footNoteId = 1;

describe('footNotes action', () => {
  describe('fetchFootNote', () => {
    it('returns a promise', () => {
      fetchFootNote({ footNoteId, verseKey: '1:1' });

      expect(apiClient.get).toHaveBeenCalled();
      expect(apiClient.get).toHaveBeenCalledWith(
        `/api/v3/foot_notes/${footNoteId}`
      );
    });
  });
});
