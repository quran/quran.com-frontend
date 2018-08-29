import React from 'react';
import ReciterDropdown from '../ReciterDropdown';

const props = {
  setSetting: jest.fn(),
  audioSetting: 1,
  fetchReciters: jest.fn(),
  recitationsOptions: [],
};

describe('<ReciterDropdown />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ReciterDropdown {...props} />)).toBeTruthy();
  });
});
