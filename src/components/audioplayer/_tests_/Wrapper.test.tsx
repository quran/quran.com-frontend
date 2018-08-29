import React from 'react';
import Wrapper from '../Wrapper';

const props = {};

describe('<Wrapper />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Wrapper {...props} />)).toBeTruthy();
  });
});
