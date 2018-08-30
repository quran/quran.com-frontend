import React from 'react';
import ChapterInfo from '../ChapterInfo';
import { chapter } from '../../../tests/fixtures/chapters';
import { chapterInfo } from '../../../tests/fixtures/chapterInfos';

describe('<ChapterInfo />', () => {
  it('renders valid', () => {
    expect(
      React.isValidElement(
        <ChapterInfo chapter={chapter} chapterInfo={chapterInfo} />
      )
    ).toBeTruthy();
  });
});
