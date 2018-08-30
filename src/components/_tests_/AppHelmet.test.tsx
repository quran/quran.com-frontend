import React from 'react';
import AppHelmet from '../AppHelmet';

describe('<AppHelmet />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<AppHelmet />)).toBeTruthy();
  });
});
