import { LOAD } from '../constants/fontFaceActionTypes.js';

export function load(className) {
  return {
    type: LOAD,
    className
  };
}
