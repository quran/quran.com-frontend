import { defineAction } from 'redux-define';
import states from './states';

// eslint-disable-next-line import/prefer-default-export
export const FETCH_CHAPTER_INFO = defineAction(
  'FETCH_CHAPTER_INFO',
  states,
  'quran'
);
