import React from 'react';
import Bismillah from '../Bismillah';

describe('<Bismillah />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Bismillah />)).toBeTruthy();
  });
});
