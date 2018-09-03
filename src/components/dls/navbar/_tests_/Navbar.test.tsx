import React from 'react';
import Navbar from '../Navbar';

describe('<Navbar />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Navbar />)).toBeTruthy();
  });
});
