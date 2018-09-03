import React from 'react';
import Nav from '../Nav';

describe('<Nav />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Nav />)).toBeTruthy();
  });
});
