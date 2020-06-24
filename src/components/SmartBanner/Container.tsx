import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #f4f4f4;
  z-index: 9998;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  -webkit-text-size-adjust: none;
  >.wrapper {
    margin: 0 auto;
    white-space: nowrap;
  }
  &.ios {
    background: #f2f2f2;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    line-height: 80px;
  }
  &.android {
    background: url(data:image/gif;base64,R0lGODlhCAAIAIABAFVVVf///yH5BAEHAAEALAAAAAAIAAgAAAINRG4XudroGJBRsYcxKAA7);
    box-shadow: inset 0 4px 0 #2ca4ab;
    line-height: 82px;
  }
  &.kindle,
  &.windows {
    background: #f4f4f4;
    background: linear-gradient(to bottom, #f4f4f4, #cdcdcd);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    line-height: 80px;
  }
`;

export default Container
