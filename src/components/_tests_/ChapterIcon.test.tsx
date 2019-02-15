import React from 'react';
import ChapterIcon from '../ChapterIcon';

describe('<ChapterIcon />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ChapterIcon id="1" />)).toBeTruthy();
  });
});
