import React from 'react';
import PageBreak from '../PageBreak';

describe('<PageBreak />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<PageBreak pageNum={1} />)).toBeTruthy();
  });
});
