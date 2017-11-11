import styled from 'styled-components';

export default styled.div`
  padding-top: 5%;
  padding-bottom: 5%;
  h3 {
    font-size: 130%;
  }
  .row {
    padding-top: 1%;
    padding-bottom: 1%;
    h3 {
      color: ${props => props.theme.brandPrimary};
      font-family: ${props => props.theme.fonts.montserrat};
    }
    h4 {
      font-weight: 300;
      line-height: 150%;
    }
  }
  .credits {
    h3 {
      color: ${props => props.theme.textColor};
    }
    h4 {
      font-family: ${props => props.theme.fonts.sourceSans};
    }
  }
`;
