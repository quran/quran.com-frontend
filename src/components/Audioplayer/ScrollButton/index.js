import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import SwitchToggle from 'quran-components/lib/Toggle';

import { ControlButton, StyledPopover } from '../index';

const ScrollButton = ({ shouldScroll, onScrollToggle }) => {
  const tooltip = (
    <StyledPopover
      id="scroll-toggle-popoverr"
      title={
        <LocaleFormattedMessage
          id="player.scrollButtonTip"
          defaultMessage="Automatically scrolls to the currently playing ayah on transitions..."
        />
      }
    >
      {'  '}
      <SwitchToggle
        checked={shouldScroll}
        onToggle={onScrollToggle}
        id="scroll-toggle"
        name="scroll-toggle"
        flat
      />
    </StyledPopover>
  );

  return (
    <div className="text-center">
      <OverlayTrigger
        overlay={tooltip}
        placement="top"
        trigger="click"
        rootClose
      >
        <ControlButton active={shouldScroll}>
          <i className="ss-icon ss-link" />
        </ControlButton>
      </OverlayTrigger>
    </div>
  );
};

ScrollButton.propTypes = {
  shouldScroll: PropTypes.bool.isRequired,
  onScrollToggle: PropTypes.func.isRequired
};

export default ScrollButton;
