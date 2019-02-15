import React from 'react';
import Popover from '../Popover';

const props = {};

describe('<Popover />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Popover {...props} />)).toBeTruthy();
  });
});
