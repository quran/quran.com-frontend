import styled from "styled-components"

const Button = styled.a`
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  color: #6a6a6a;
  text-transform: uppercase;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  &:active,
  &:hover {
    color: #aaa;
  }
  &.ios{
    padding: 0 10px;
    font-size: 15px;
    min-width: 10%;
    font-weight: 400;
    color: #2ca4ab;
    &:hover,
    &:active {
      background: #f2f2f2;
    }
  }
  &.android {
    min-width: 12%;
    color: #d1d1d1;
    font-weight: bold;
    padding: 0;
    background: none;
    border-radius: 0;
    box-shadow: 0 0 0 1px #333, 0 0 0 2px #dddcdc;
    &:hover,
    &:active {
      background: none;
    }
  }
  &.kindle,
  &.windows {
    padding: 0 10px;
    min-width: 10%;
    color: #6a6a6a;
    background: #efefef;
    background: linear-gradient(to bottom, #efefef, #dcdcdc);
    border-radius: 3px;
    box-shadow: inset 0 0 0 1px #bfbfbf, 0 1px 0 rgba(255, 255, 255, 0.6),
      0 2px 0 rgba(255, 255, 255, 0.7) inset;
    &:hover,
    &:active {
      background: #dcdcdc;
      background: linear-gradient(to bottom, #dcdcdc, #efefef);
    }
  }
`;

const ButtonText = styled.span`
  text-align: center;
  display: block;
  padding: 0 10px;
  background: #2ca4ab;
  background: linear-gradient(to bottom, #2ca4ab, #42b6c9);
  text-transform: none;
  text-shadow: none;
  box-shadow: none;
  &.android {
    background: #2ca4ab;
  }
`;

export {
  Button,
  ButtonText
}
