import React from 'react';
import PageView from '../PageView';

const props = {};

describe('<PageView />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<PageView {...props} />)).toBeTruthy();
  });
});
