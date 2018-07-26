import styled from 'styled-components';

export default styled.div`
  ${props => (props.arabic ? 'text-align: right;' : '')} h4 {
    color: ${props => props.theme.brandPrimary};
    margin-bottom: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
    @media (max-width: ${props => props.theme.screen.md}px) {
      font-size: 12px;
    }
  }
  h2 {
    margin-top: 5px;
    margin-bottom: 25px;
  }
  sup {
    color: ${props => props.theme.brandPrimary};
    cursor: pointer;
  }
`;
