import { createSelector } from 'reselect';

export default createSelector(
  state => state.fontFaces,
  fontFaces => fontFaces
);
