import React from 'react';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import PropTypes from 'prop-types';

const ScrollLink = styled.a`
  width: 100%;
  display: inline-block;
  cursor: pointer;
  padding-right: 1.5%;
  color: ${props =>
    props.active ? props.theme.brandPrimary : props.theme.textColor};
  outline: none;
  cursor: pointer;
  margin-bottom: 0;
`;

const ScrollButton = ({ shouldScroll, onScrollToggle }) => {
  const tooltip = (
    <Tooltip id="scroll-button-tooltip" placement="bottom">
      <LocaleFormattedMessage
        id="player.scrollButtonTip"
        defaultMessage="Automatically scrolls to the currently playing ayah on transitions..."
      />
    </Tooltip>
  );

  return (
    <div className="text-center">
      <OverlayTrigger
        overlay={tooltip}
        placement="top"
        trigger={['hover', 'focus']}
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
