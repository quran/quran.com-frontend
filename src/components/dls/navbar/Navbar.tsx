import styled, { css } from 'styled-components';

const fixedStyle = css`
  top: 0;
  border-width: 0 0 1px;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const scrolledCss = css`
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.5s;
`;

const NavbarNode = styled.nav<{ scrolled?: boolean; fixed?: boolean }>`
  height: 3.5rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  ${({ scrolled }) => (scrolled ? scrolledCss : '')};

  ${({ fixed }) => (fixed ? fixedStyle : '')};
`;

export default NavbarNode;
