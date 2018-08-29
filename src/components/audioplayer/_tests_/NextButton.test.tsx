import React from 'react';
import NextButton from '../NextButton';
import { chapter } from '../../../../tests/fixtures/chapters';

const props = {
  onNextClick: jest.fn(),
  currentVerseKey: '1:1',
  chapter,
};

describe('<NextButton />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<NextButton {...props} />)).toBeTruthy();
  });
});
