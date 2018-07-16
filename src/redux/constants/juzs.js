import { defineAction } from 'redux-define';
import states from './states';

export const FETCH_JUZS = defineAction('FETCH_JUZS', states, 'quran');
