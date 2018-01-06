import { defineAction } from 'redux-define';
import states from './states';

export const SUGGEST = defineAction('SUGGEST', states, 'quran');
