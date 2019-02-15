import React from 'react';
import PlayStopButton from '../PlayStopButton';

const props = {
  isPlaying: true,
  onPause: jest.fn(),
  onPlay: jest.fn(),
  currentVerseKey: '1:1',
};

describe('<PlayStopButton />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<PlayStopButton {...props} />)).toBeTruthy();
  });
});
