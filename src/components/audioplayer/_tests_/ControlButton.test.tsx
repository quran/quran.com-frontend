import React from 'react';
import ControlButton from '../ControlButton';

const props = {};

describe('<ControlButton />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<ControlButton {...props} />)).toBeTruthy();
  });
});
