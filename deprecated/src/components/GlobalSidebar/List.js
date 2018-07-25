import styled from 'styled-components';

export default styled.ul`
  padding-left: 0;

  li {
    color: #777;

    a {
      color: #777;
      padding: 10px 15px;
      display: block;

      .ss-icon {
        font-size: 18px;
        margin-right: 20px;
      }

      &:hover {
        background: #f5f5f5;
        color: #333;
      }
    }
  }
`;
