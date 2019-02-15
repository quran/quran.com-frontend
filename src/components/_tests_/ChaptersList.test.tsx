import React from 'react';
import ChaptersList from '../ChaptersList';
import { chapter } from '../../../tests/fixtures/chapters';

describe('<ChaptersList />', () => {
  it('renders valid', () => {
    expect(
      React.isValidElement(<ChaptersList chapters={[chapter]} />)
    ).toBeTruthy();
  });
});
