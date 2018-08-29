import React from 'react';
import TooltipOptions from '../TooltipOptions';

const props = {
  tooltip: 'translation',
  onChange: jest.fn(),
};

describe('<TooltipOptions />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<TooltipOptions {...props} />)).toBeTruthy();
  });
});
