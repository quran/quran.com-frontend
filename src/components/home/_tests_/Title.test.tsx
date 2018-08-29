import React from 'react';
import Title from '../Title';

describe('<Title />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Title />)).toBeTruthy();
  });
});
