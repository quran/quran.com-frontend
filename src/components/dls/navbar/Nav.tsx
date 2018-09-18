import styled from 'styled-components';

const Nav = styled.ul<{ right?: boolean }>`
  float: left;
  margin: 0;
  list-style: none;
  padding-left: 0;
  ${({ right }) => (right ? 'float: right;' : '')};

  &:after,
  &:before {
    content: ' ';
    display: table;
  }

  &:after {
    clear: both;
  }

  & > li {
    display: block;
    float: left;
    cursor:pointer;
    a {
      display: block;
      padding: 1rem 1rem;
      color: ${({ theme }) => theme.textColor};
    }
  }
`;

export default Nav;
