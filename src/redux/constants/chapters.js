import { defineAction } from 'redux-define';
import states from './states';

export const FETCH_CHAPTERS = defineAction('FETCH_CHAPTERS', states, 'quran');
export const FETCH_CHAPTER_INFO = defineAction(
  'FETCH_CHAPTER_INFO',
  states,
  'quran'
);
export const SET_CURRENT = defineAction('SET_CURRENT', [], 'quran');
