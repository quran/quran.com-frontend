import styled from 'styled-components';
import { darken } from 'polished';

export default styled.h1`
  white-space: pre-line;
  color: #000;
  width: 100%;
  overflow-wrap: break-word;
  line-height: 1.5;
  word-break: break-all;
  text-align: right;
  float: left;
  b,
  span {
    border-color: transparent;
    border-width: 0 0 1px 0;
    border-style: solid;
    float: right;
    &.active {
      color: ${props => darken(0.05, props.theme.brandPrimary)};
      border-color: ${props => darken(0.15, props.theme.brandPrimary)};
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
      color: ${props => props.theme.brandPrimary};
      cursor: help;
    }
    &:focus {
      color: ${props => darken(0.1, props.theme.brandPrimary)};
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
  @media (max-width: ${props => props.theme.screen.sm}) {
    font-size: 300%;
    line-height: 130%;
  }
}
`;
