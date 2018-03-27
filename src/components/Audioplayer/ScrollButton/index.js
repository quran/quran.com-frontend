import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import { StyledPopover } from '../RepeatDropdown/index';

// eslint-disable-next-line no-confusing-arrow
const scrollColor = props =>
  props.active ? props.theme.brandPrimary : props.theme.textColor;

const ScrollLink = styled.a`
  width: 100%;
  display: inline-block;
  cursor: pointer;
  padding-right: 1.5%;
  color: ${scrollColor};
  outline: none;
  cursor: pointer;
  margin-bottom: 0;
`;

const ScrollButton = ({ shouldScroll, onScrollToggle }) => {
  const tooltip = (
    <StyledPopover id="scroll-popover">
      <LocaleFormattedMessage
        id="player.scrollButtonTip"
        defaultMessage="Automatically scrolls to the currently playing ayah on transitions..."
      />
    </StyledPopover>
  );

  return (
    <div className="text-center">
      <OverlayTrigger
        overlay={tooltip}
        placement="top"
        trigger={['hover', 'focus']}
        delayHide={150}
      >
        <ScrollLink
          tabIndex="-1"
          active={shouldScroll}
          onClick={onScrollToggle}
        >
          <i className="ss-icon ss-link" />
        </ScrollLink>
      </OverlayTrigger>
    </div>
  );
};

ScrollButton.propTypes = {
  shouldScroll: PropTypes.bool.isRequired,
  onScrollToggle: PropTypes.func.isRequired
};

export default ScrollButton;
