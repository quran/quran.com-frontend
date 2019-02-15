import React from 'react';
import FontSizeOptions from '../FontSizeOptions';

const props = {
  onChange: jest.fn(),
  fontSize: {
    arabic: 1,
    translation: 1,
  },
};

describe('<FontSizeOptions />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<FontSizeOptions {...props} />)).toBeTruthy();
  });
});
