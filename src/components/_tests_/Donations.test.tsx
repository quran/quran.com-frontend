import React from 'react';
import Donations from '../Donations';

describe('<Donations />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Donations />)).toBeTruthy();
  });
});
