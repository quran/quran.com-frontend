import React from 'react';
import Word from '../Word';
import verse from '../../../tests/fixtures/verse';

const word = verse.words[0];
const tooltip: 'translation' = 'translation';

const props = {
  word,
  setCurrentWord: jest.fn(),
  pause: jest.fn(),
  setCurrentVerseKey: jest.fn(),
  playCurrentWord: jest.fn(),
  tooltip,
  isCurrentVersePlaying: true,
};

describe('<Word />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Word {...props} />)).toBeTruthy();
  });
});
