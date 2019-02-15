import React from 'react';
import Track from '../Track';

const props = {
  progress: 0,
  onTrackChange: jest.fn(),
};

describe('<Track />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Track {...props} />)).toBeTruthy();
  });
});
