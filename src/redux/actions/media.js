import {
  SET_MEDIA,
  REMOVE_MEDIA
} from '../constants/media';

export function setMedia(content) {
  return {
    type: SET_MEDIA,
    content
  };
};

export function removeMedia() {
  return {
    type: REMOVE_MEDIA
  };
};
