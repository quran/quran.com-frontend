import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
} from 'redux/constants/audioFiles.js';

export function load({ chapterId, verseId, verseKey, audio }) { // eslint-disable-line
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/api/v3/chapters/${chapterId}/verses/${verseId}/audio_files`, {
      params: {
        recitation: audio
      }
    }),
    verseKey
  };
}
