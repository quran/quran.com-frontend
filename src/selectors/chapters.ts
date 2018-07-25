import { ReduxState } from '../types';

export const isAllLoaded = (state: ReduxState) => {
  return Object.keys(state.chapters.entities).length === 114;
};
