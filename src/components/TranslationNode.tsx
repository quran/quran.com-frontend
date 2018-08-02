import styled from 'styled-components';

export default styled.div<{ arabic?: boolean }>`
  ${({ arabic }) => (arabic ? 'text-align: right;' : '')} h4 {
    color: ${({ theme }) => theme.brandPrimary};
    margin-bottom: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
    @media (max-width: ${({ theme }) => theme.screenMd}) {
      font-size: 12px;
    }
  }
  h2 {
    margin-top: 5px;
    margin-bottom: 25px;
  }
  sup {
    color: ${({ theme }) => theme.brandPrimary};
    cursor: pointer;
  }
`;
