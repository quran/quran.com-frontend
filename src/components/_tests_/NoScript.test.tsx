import React from 'react';
import NoScript from '../NoScript';

describe('<NoScript />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<NoScript />)).toBeTruthy();
  });
});
