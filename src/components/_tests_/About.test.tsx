import React from 'react';
import About from '../About';

describe('<About />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<About />)).toBeTruthy();
  });
});
