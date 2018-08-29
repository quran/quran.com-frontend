import React from 'react';
import ChapterInfoToggle from '../ChapterInfoToggle';

const props = {
  isToggled: false,
  onToggle: jest.fn(),
};

describe('<ChapterInfoToggle />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ChapterInfoToggle {...props} />)).toBeTruthy();
  });
});
