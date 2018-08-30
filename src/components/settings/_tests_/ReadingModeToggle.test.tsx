import React from 'react';
import ReadingModeToggle from '../ReadingModeToggle';

const props = {
  isToggled: false,
  onToggle: jest.fn(),
};

describe('<ReadingModeToggle />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ReadingModeToggle {...props} />)).toBeTruthy();
  });
});
