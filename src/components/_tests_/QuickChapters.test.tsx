import React from 'react';
import QuickChapters from '../QuickChapters';

describe('<QuickChapters />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<QuickChapters />)).toBeTruthy();
  });
});
