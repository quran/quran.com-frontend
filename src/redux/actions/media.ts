import {
  SET_MEDIA,
  REMOVE_MEDIA,
  FETCH_TAFISRS,
  FETCH_FOOT_NOTE,
} from '../constants/media';
import apiClient from '../../apiClient';

export const setMedia = content => ({
  type: SET_MEDIA,
  content,
});

export const removeMedia = () => ({
  type: REMOVE_MEDIA,
});

export const fetchTafsirs = (verse, title) => ({
  type: FETCH_TAFISRS,
  promise: apiClient.get('/api/v3/options/tafsirs'),
  verse,
  title,
});

export const loadFootNote = footNoteId => ({
  type: FETCH_FOOT_NOTE,
  promise: apiClient.get(`/api/v3/foot_notes/${footNoteId}`),
});
