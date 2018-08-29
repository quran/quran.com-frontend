import React from 'react';
import PreviousButton from '../PreviousButton';

const props = {
  onPreviousClick: jest.fn(),
  currentVerseKey: '1:1',
  files: {},
};

describe('<PreviousButton />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<PreviousButton {...props} />)).toBeTruthy();
  });
});
