import { SET_MEDIA, REMOVE_MEDIA } from '../constants/media';

export const setMedia = (content: string) => ({
  type: SET_MEDIA,
  content,
});

export const removeMedia = () => ({
  type: REMOVE_MEDIA,
});
