import styled from 'styled-components';

export default styled.h4<{ muted?: boolean }>`
  font-size: 14px;

  ${props => (props.muted ? `color: ${props.theme.textMuted};` : '')} span {
    margin: 0;
    line-height: 2;
    a {
      padding: 0 15px;
    }
  }

  &:last-child {
    margin-top: 25px;
  }
`;
