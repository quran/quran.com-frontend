import styled from 'styled-components';
import BootstrapPopover from 'react-bootstrap/lib/Popover';

const Popover = styled(BootstrapPopover)`
  .popover-title {
    text-transform: uppercase;
    color: ${({ theme }) => theme.brandPrimary};
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 0.75em;
  }
  .popover-content {
    text-align: center;
    a {
      font-size: 0.8em;
    }
  }
`;

export default Popover;
