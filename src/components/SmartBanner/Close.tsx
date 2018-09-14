import styled from "styled-components"

const Close = styled.button`
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  margin: 0 5px;
  font-size: 20px;
  text-align: center;
  color: #888;
  text-decoration: none;
  border: 0;
  border-radius: 14px;
  -webkit-font-smoothing: subpixel-antialiased;
  &:hover,
  &:active {
    color: #aaa;
  }
  &.ios {
    border: 0;
    width: 18px;
    height: 18px;
    line-height: 18px;
    font-family: Arial, sans-serif;
    color: #888;
    text-shadow: 0 1px 0 #fff;
    -webkit-font-smoothing: none;
    &:hover,
    &:active {
      color: #888;
    }
  }
  &.android {
    border: 0;
    width: 17px;
    height: 17px;
    line-height: 17px;
    margin-right: 7px;
    color: #b1b1b3;
    background: #1c1e21;
    text-shadow: 0 1px 1px #000;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) inset,
      0 1px 1px rgba(255, 255, 255, 0.3);
    cursor: pointer;
    &:hover,
    &:active {
      color: #eee;
    }
  }
  &.kindle,
  &.windows {
    border: 0;
    width: 18px;
    height: 18px;
    line-height: 18px;
    color: #888;
    text-shadow: 0 1px 0 #fff;
    &:hover,
    &:active {
      color: #aaa;
    }
  }
`;

export default Close
