import React, { PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import {FormattedMessage } from 'react-intl';

const style = require('../style.scss');

const ScrollButton = ({ shouldScroll, onScrollToggle }) => {
  const tooltip = (
    <Tooltip id="scroll-button-tooltip">
      <FormattedMessage
        id={ "player.scrollButtonTip" }
        defaultMessage={'Automatically scrolls to the currently playing ayah on transitions...'}
      />
    </Tooltip>
  );

  return (
    <div className="text-center">
      <input type="checkbox" id="scroll" className={style.checkbox} />
      <OverlayTrigger
        overlay={tooltip}
        placement="top"
        trigger={['hover', 'focus']}
      >
        <label
          htmlFor="scroll"
          className={`pointer ${style.buttons} ${shouldScroll ? style.scroll : ''}`}
          onClick={onScrollToggle}
          style={{marginBottom: 0}}
        >
          <i className="ss-icon ss-link" />
        </label>
      </OverlayTrigger>
    </div>
  );
};

ScrollButton.propTypes = {
  shouldScroll: PropTypes.bool.isRequired,
  onScrollToggle: PropTypes.func.isRequired
};

export default ScrollButton;
