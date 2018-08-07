import React from 'react';
import MobileLanding from '../MobileLanding';

describe('<MobileLanding />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<MobileLanding />)).toBeTruthy();
  });
});
