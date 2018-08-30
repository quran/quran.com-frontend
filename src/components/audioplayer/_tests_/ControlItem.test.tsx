import React from 'react';
import ControlItem from '../ControlItem';

const props = {};

describe('<ControlItem />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ControlItem {...props} />)).toBeTruthy();
  });
});
