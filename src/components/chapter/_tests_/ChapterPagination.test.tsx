import React from 'react';
import ChapterPagination from '../ChapterPagination';
import { chapter } from '../../../../tests/fixtures/chapters';
import { INITIAL_STATE } from '../../../redux/reducers/settings';

const props = {
  isSingleVerse: false,
  isLoading: false,
  isEndOfChapter: false,
  chapter,
  verses: {},
  settings: INITIAL_STATE,
  onLazyLoad: jest.fn(),
};

describe('<ChapterPagination />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ChapterPagination {...props} />)).toBeTruthy();
  });
});
