import styled from 'styled-components';

export default styled.div`
  padding-top: 70px;
  min-height: 100vh;

  @media (max-width: ${props => props.theme.screen.sm}) {
    padding-top: 70px;
  }
`;
