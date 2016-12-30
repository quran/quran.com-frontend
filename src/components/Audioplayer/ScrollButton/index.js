import React, { PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const style = require('../style.scss');

const ScrollButton = ({ shouldScroll, onScrollToggle }) => {
  const tooltip = (
    <Tooltip id="scroll-button-tooltip">
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
        <a
          tabIndex="-1"
          className={`pointer ${style.buttons} ${shouldScroll ? style.scroll : ''}`}
          onClick={onScrollToggle}
          style={{ marginBottom: 0 }}
        >
          <i className="ss-icon ss-link" />
        </a>
      </OverlayTrigger>
    </div>
  );
};

ScrollButton.propTypes = {
  shouldScroll: PropTypes.bool.isRequired,
  onScrollToggle: PropTypes.func.isRequired
};

export default ScrollButton;
