import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: block;
  user-select: none;
  height: auto;
  z-index: 1;
  padding: 20px 20px 10px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  width: 100%;

  .list-inline {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
  }

  @media (max-width: ${({ theme }) => theme.screen.sm}) {
    bottom: 0;
    width: 100%;
  }
`;

export default Wrapper;
