import React from 'react';
import Footer from '../Footer';

describe('<Footer />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Footer />)).toBeTruthy();
  });
});
