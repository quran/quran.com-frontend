import React from 'react';
import FontText from '../FontText';

describe('<FontText />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<FontText />)).toBeTruthy();
  });
});
