import React from 'react';
import Verse from '../Verse';
import verse from '../../../tests/fixtures/verse';
import { chapter } from '../../../tests/fixtures/chapters';

const tooltip: 'translation' = 'translation';

const props = {
  verse,
  chapter,
  isCurrentVersePlaying: true,
  tooltip,
  fetchTafsirs: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  setCurrentVerseKey: jest.fn(),
  isPdf: false,
};

describe('<Verse />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Verse {...props} />)).toBeTruthy();
  });
});
