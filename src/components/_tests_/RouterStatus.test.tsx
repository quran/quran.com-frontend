import React from 'react';
import RouterStatus from '../RouterStatus';

const props = {
  code: 400,
  children: <div />,
};

describe('<RouterStatus />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<RouterStatus {...props} />)).toBeTruthy();
  });
});
