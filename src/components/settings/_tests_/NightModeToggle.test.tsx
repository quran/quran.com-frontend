import React from 'react';
import NightModeToggle from '../NightModeToggle';

const props = {
  isNightMode: false,
  onToggle: jest.fn(),
};

describe('<NightModeToggle />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<NightModeToggle {...props} />)).toBeTruthy();
  });
});
