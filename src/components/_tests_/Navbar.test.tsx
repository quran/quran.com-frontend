import React from 'react';
import Navbar from '../Navbar';

const props = {
  location: {
    pathname: '/',
  },
  handleSidebarToggle: jest.fn(),
};

describe('<Navbar />', () => {
  it('renders valid', () => {
    expect(React.isValidElement(<Navbar {...props} />)).toBeTruthy();
  });
});
