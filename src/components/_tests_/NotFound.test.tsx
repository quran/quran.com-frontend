import React from 'react';
import NotFound from '../NotFound';

describe('<NotFound />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<NotFound />)).toBeTruthy();
  });
});
