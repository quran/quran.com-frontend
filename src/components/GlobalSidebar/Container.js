import styled from 'styled-components';

const CONTAINER_WIDTH = 280;

export default styled.div`
  position: fixed;
  left: ${CONTAINER_WIDTH * -1}px;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 1031;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  visibility: hidden;

  background: #fff;
  width: ${CONTAINER_WIDTH}px;
  transition: left 0.35s cubic-bezier(0.24, 1, 0.32, 1), visibility 0.2s;

  ${props => (props.open ? 'left: 0; visibility: visible;' : '')} .navbar-text {
    margin-left: 0;
    .backToHome {
      margin-right: 23px;
      font-size: 17px;
    }
  }

  @media (max-width: ${props => props.theme.screen.sm}px) {
    width: ${CONTAINER_WIDTH}px;
    left: ${CONTAINER_WIDTH * -1}px;

    ${props => (props.open ? 'left: 0; ' : '')} .navbar-text {
      padding-left: 15px;
    }
  }
`;
