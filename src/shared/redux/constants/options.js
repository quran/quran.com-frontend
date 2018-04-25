import { defineAction } from 'redux-define';
import states from './states';

export const SET_OPTION = '@@quran/options/SET_OPTION';
export const TOGGLE_NIGHT_MODE = '@@quran/options/TOGGLE_NIGHT_MODE';
export const SET_USER_AGENT = '@@quran/options/SET_USER_AGENT';

export const FETCH_RECITERS = defineAction('FETCH_RECITERS', states, 'quran');
export const FETCH_TRANSLATIONS = defineAction(
  'FETCH_TRANSLATIONS',
  states,
  'quran'
);
