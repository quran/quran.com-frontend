import {
  SET_MEDIA,
  REMOVE_MEDIA
} from 'redux/constants/media';

export const setMedia = content => ({
  type: SET_MEDIA,
  content
});

export const removeMedia = () => ({
  type: REMOVE_MEDIA
});
