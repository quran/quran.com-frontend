import styled from 'styled-components';

const Nav = styled.ul`
  float: left;
  margin: 0;
  list-style: none;
  ${({ right }) => (right ? 'float: right;' : '')};
`;

export default Nav;
