import styled from "styled-components"

const Info = styled.div`
   display: inline-block;
  vertical-align: middle;
  width: 44%;
  font-size: 11px;
  line-height: 1.2em;
  font-weight: bold;
  &.ios {
    color: #6a6a6a;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
    font-weight: 300;
  }
  &.android {
    color: #ccc;
    text-shadow: 0 1px 2px #000;
  }
  &.kindle,
  &.windows {
    color: #6a6a6a;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  }
`;

const Title = styled.div`
  font-size: 13px;
  line-height: 18px;
  overflow: hidden;
  &.ios {
    color: #4d4d4d;
    font-weight: 500;
  }
  &.android {
    color: #fff;
    font-weight: bold;
  }
  &.kindle,
  &.windows {
    color: #4d4d4d;
    font-weight: bold;
  }
`;

export {
  Info,
  Title
}
