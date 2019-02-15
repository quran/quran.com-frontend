import React from 'react';
import ScrollButton from '../ScrollButton';

const props = {
  shouldScroll: false,
  onScrollToggle: jest.fn(),
};

describe('<ScrollButton />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ScrollButton {...props} />)).toBeTruthy();
  });
});
