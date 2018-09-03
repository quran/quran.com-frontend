import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

type Props = {
  children: ReactNode;
  scrolled?: boolean;
};

const NavbarNode = styled.nav`
  ${({ scrolled }) =>
    scrolled
      ? 'box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)'
      : ''};
`;

const Navbar: React.SFC<Props> = ({ children, scrolled }: Props) => (
  <NavbarNode scrolled={scrolled}>
    <div className="container-fluid">{children}</div>
  </NavbarNode>
);

Navbar.propTypes = propTypes;

export default Navbar;
