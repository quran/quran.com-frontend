import { LOAD } from '../constants/FontFaceActionTypes.js';

export function load(className) {
  return {
    type: LOAD,
    className
  };
}
