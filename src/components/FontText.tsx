import styled from 'styled-components';
import { darken } from 'polished';

export default styled.div<{ readingMode?: boolean }>`
  white-space: pre-line;
  color: #000;
  width: 100%;
  overflow-wrap: break-word;
  line-height: 1.5;
  word-break: break-all;
  text-align: right;
  float: left;
  -webkit-font-smoothing: antialiased;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 3.5rem;
  b,
  span {
    border-color: transparent;
    border-width: 0 0 1px 0;
    border-style: solid;
    float: ${({ readingMode }) => (readingMode ? 'none' : 'right')};
    &.active {
      color: ${({ theme }) => darken(0.05, theme.brandPrimary)};
      border-color: ${({ theme }) => darken(0.15, theme.brandPrimary)};
    }
  }
  .line {
    direction: rtl;
    b,
    span {
      float: none;
      display: inline-block;
    }
  }
  b,
  a {
    font-weight: 100;
    padding: 0 2px;
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.brandPrimary};
      cursor: help;
    }
    &:focus {
      color: ${({ theme }) => darken(0.1, theme.brandPrimary)};
      outline: none;
    }
  }
  p {
    display: block;
    clear: both;
    text-align: right;
    direction: rtl;
    float: right;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 300%;
    line-height: 130%;
  }
}
`;
