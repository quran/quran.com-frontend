import { defineAction } from 'redux-define';
import states from './states';

export const SEARCH = defineAction('SEARCH', states, 'quran');
