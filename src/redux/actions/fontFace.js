import { LOAD } from 'redux/constants/fontFace.js';

export function load(className) {
  return {
    type: LOAD,
    className
  };
}
