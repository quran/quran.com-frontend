import { LOAD } from '../constants/fontFace.js';

export function load(className) {
  return {
    type: LOAD,
    className
  };
}
