import React from 'react';
import Contact from '../Contact';

describe('<Contact />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Contact />)).toBeTruthy();
  });
});
