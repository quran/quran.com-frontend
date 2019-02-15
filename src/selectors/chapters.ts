import ReduxState from '../types/ReduxState';
import { NUMBER_OF_CHAPTERS } from '../constants';

// eslint-disable-next-line
export const isAllLoaded = (state: ReduxState) => {
  return Object.keys(state.chapters.entities).length === NUMBER_OF_CHAPTERS;
};
