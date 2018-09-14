import styled from "styled-components";

const Icon = styled.span<{
  icon: string
}>`
  display: inline-block;
  vertical-align: middle;
  width: 57px;
  height: 57px;
  margin-right: 12px;
  background-size: cover;
  border-radius: 10px;
  background-image: ${props => `url(${ props.icon })`};
  &.ios {
    background-size: cover;
  }
  &.android {
    background-color: transparent;
    box-shadow: none;
  }
  &.kindle,
  &.windows {
    background: rgba(0, 0, 0, 0.6);
    background-size: cover;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

export default Icon
