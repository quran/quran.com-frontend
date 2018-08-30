import React from 'react';
import List from '../List';

describe('<List />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<List />)).toBeTruthy();
  });
});
