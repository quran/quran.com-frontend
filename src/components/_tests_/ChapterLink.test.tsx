import React from 'react';
import ChapterLink from '../ChapterLink';
import { chapter } from '../../../tests/fixtures/chapters';

describe('<ChapterLink />', () => {
  it('renders valid', () => {
    expect(
      React.isValidElement(<ChapterLink chapter={chapter} />)
    ).toBeTruthy();
  });
});
